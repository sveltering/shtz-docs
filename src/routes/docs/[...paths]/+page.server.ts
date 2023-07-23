import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { readdir } from 'fs/promises';
import { readFile } from 'fs/promises';
import { marked } from 'marked';
//@ts-ignore
import { JSDOM } from 'jsdom';
//@ts-ignore
import DOMPurify from 'dompurify';
import { dev } from '$app/environment';
// https://regexr.com/7hffv
const metaRegex = /\-\-\-(?:[ \t]{0,})meta\n((?:.|\n)*)\-\-\-/gim;
const metaAliases: { [key: string]: string } = { desc: 'description' };

const rootPath = process.cwd();
const docsPath = rootPath + '/src/routes/md-docs';
let allPaths = await getPaths(docsPath, true);

export const load = (async (event) => {
	if (dev) {
		allPaths = await getPaths(docsPath, true);
	}
	const paths = event.params.paths.split('/');
	const path = getPath(paths);
	const meta: { [key: string]: string } = {};
	const warnings: [string, any][] = [];

	if (!path || !path.files.hasOwnProperty('readme.md')) {
		throw error(404, {
			message: "Sorry, this page doesn't exist"
		});
	}

	let md: string;
	try {
		md = (await readFile(path.files['readme.md'])).toString();
	} catch (e) {
		throw error(404, {
			message: "Sorry, this page doesn't exist"
		});
	}

	const matchMeta = md.match(metaRegex);
	if (matchMeta) {
		const matchMetaString: string = matchMeta[0];
		const splits = matchMetaString.split(/\n/g);
		splits.shift();
		splits.pop();
		for (let i = 0, iLen = splits.length; i < iLen; i++) {
			const metaSplits = splits[i].split(':');
			if (metaSplits.length !== 2) {
				warnings.push(['Invalid meta found', splits[i]]);
				continue;
			}
			let tagName = metaSplits[0].trim();

			meta[metaAliases?.[tagName] || tagName] = metaSplits[1].trim();
		}
		md = md.replace(matchMetaString, '');
	}

	const purify = DOMPurify(new JSDOM('').window);
	// const content = marked.parse(md.toString(), { mangle: false, headerIds: false });
	const content = marked(md, { mangle: false, headerIds: false });

	return {
		content: purify.sanitize(content),
		allPaths,
		paths,
		path,
		meta,
		warnings
	};
}) satisfies PageServerLoad;
/*
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

function getPath(paths: string[]) {
	let current = allPaths;
	for (let i = 0, iLen = paths.length; i < iLen; i++) {
		current = current?.paths?.[paths[i]];
		if (!current) {
			return false;
		}
	}
	return current;
}

async function getPaths(path: string, firstPath: boolean = false) {
	const directories = (await readdir(path, { withFileTypes: true }))
		.filter((dir) => dir.isDirectory())
		.map((dir, index) => dir.name)
		.sort(new Intl.Collator('en', { numeric: true, sensitivity: 'accent' }).compare);

	const returnPaths: any = {};

	for (let i = 0, iLen = directories.length; i < iLen; i++) {
		const dirName = directories[i];
		const fullPath = path + '/' + dirName;
		let prevPath: any = {};
		let nextPath: any = {};

		const { urlPath, title } = pathAndTitle(dirName);

		if (!firstPath) {
			if (directories?.[i - 1]) {
				prevPath = pathAndTitle(directories[i - 1]);
			}
			if (directories?.[i + 1]) {
				nextPath = pathAndTitle(directories[i + 1]);
			}
		}

		returnPaths[urlPath] = {
			path: fullPath,
			paths: await getPaths(fullPath),
			...{ prevPath },
			...{ nextPath }
		};
		returnPaths[urlPath].files = await getFiles(fullPath);
	}
	if (firstPath) {
		return { paths: returnPaths };
	}
	return returnPaths;
}

async function getFiles(path: string) {
	const files = (await readdir(path, { withFileTypes: true }))
		.filter((dir) => dir.isFile() && ['readme.md'].includes(dir.name.toLowerCase()))
		.map((dir) => dir.name);

	const returnPaths: any = {};

	for (let i = 0, iLen = files.length; i < iLen; i++) {
		const fileName = files[i];
		returnPaths[fileName.toLowerCase()] = path + '/' + fileName;
	}

	return returnPaths;
}

function pathAndTitle(path: string) {
	const [first, ...rest] = path.split('-');
	const urlPath = first.length && !rest.length ? first : rest.join('-');
	let title = first.length && !rest.length ? first : rest.join(' ');
	title = title[0].toUpperCase() + title.slice(1);

	return { urlPath, title };
}
