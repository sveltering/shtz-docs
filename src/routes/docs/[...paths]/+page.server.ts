import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { readdir } from 'fs/promises';
import { readFile } from 'fs/promises';
import { marked } from 'marked';
import { gfmHeadingId } from 'marked-gfm-heading-id';
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
let allPaths: any = undefined;

export const load = (async (event) => {
	const paths = event.params.paths.split('/');
	if (dev || allPaths === undefined) {
		allPaths = await makePaths(docsPath + '/' + paths.shift(), '', true);
	}
	const path = getCurrentPath(paths);
	const meta: { [key: string]: string } = {};
	const warnings: [string, any][] = [];

	if (!path || !path.files?.hasOwnProperty('readme.md')) {
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
	marked.use(gfmHeadingId());

	const content = marked(md, { mangle: false, headerIds: false });

	return {
		content: purify.sanitize(content),
		allPaths,
		paths,
		path,
		meta,
		warnings
	} as any;
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

function getCurrentPath(paths: string[]) {
	let current = allPaths;
	for (let i = 0, iLen = paths.length; i < iLen; i++) {
		current = current?.paths?.[paths[i]];
		if (!current) {
			return false;
		}
	}
	return current;
}

async function makePaths(
	path: string,
	lastSlug: string,
	firstPath: boolean = false
) {
	const directories = (await readdir(path, { withFileTypes: true }))
		.filter((dir) => dir.isDirectory())
		.map((dir, index) => dir.name)
		.sort(
			new Intl.Collator('en', { numeric: true, sensitivity: 'accent' }).compare
		);

	const returnPaths: any = {};

	for (let i = 0, iLen = directories.length; i < iLen; i++) {
		const dirName = directories[i];
		if (dirName === 'files') {
			continue;
		}
		const fullPath = path + '/' + dirName;
		let prevPath: any = {};
		let nextPath: any = {};

		const { slug, title } = pathAndTitle(dirName);

		// if (!firstPath) {
		if (directories?.[i - 1]) {
			prevPath = pathAndTitle(directories[i - 1]);
		}
		if (directories?.[i + 1]) {
			nextPath = pathAndTitle(directories[i + 1]);
		}
		// }

		returnPaths[slug] = {
			path: fullPath,
			paths: await makePaths(fullPath, lastSlug + '/' + slug),
			codeFiles: await getTxtFiles(fullPath),
			title,
			slug,
			url: lastSlug + '/' + slug,
			isFirst: firstPath,
			...{ prevPath },
			...{ nextPath }
		};
		returnPaths[slug].files = await getFiles(fullPath);
	}
	if (firstPath) {
		return { paths: returnPaths };
	}
	return returnPaths;
}

async function getTxtFiles(path: string) {
	const files = (await readdir(path, { withFileTypes: true }))
		.filter((dir) => dir.isDirectory() && dir.name.toLowerCase() === 'files')
		.map((dir) => dir.name);
	if (files.length) {
		return await getTxtFilesRecursive(path + '/files');
	}
	return undefined;
}

async function getTxtFilesRecursive(path: string, startPath = '') {
	const files = (await readdir(path, { withFileTypes: true }))
		.filter((dir) => dir.isDirectory() || dir.isFile())
		.map((dir) => {
			if (dir.isDirectory()) {
				return { dir: dir.name };
			}
			if (dir.name.slice(-4) === '.txt') {
				const filePath = startPath + '/' + dir.name;
				const filePathSplit = filePath.slice(0, -4).split('/');
				filePathSplit.shift();
				return {
					file: dir.name.slice(0, -4),
					filePath: filePathSplit,
					id: 'id' + filePath.replace(/ /g, '-').replace(/[^\w-]+/g, '-')
				};
			}
		})
		.sort((a, b) => {
			if (a?.dir) {
				return -1;
			}
			return 1;
		});

	for (let i = 0, iLen = files.length; i < iLen; i++) {
		const file = files[i] as any;
		if (file?.file) {
			let fileContent;
			try {
				fileContent = (
					await readFile(path + '/' + file.file + '.txt')
				).toString();
			} catch (e) {
				fileContent = 'Error loading file content';
			}
			file.content = fileContent;
		}
		if (file?.dir) {
			file.files = await getTxtFilesRecursive(
				path + '/' + file.dir,
				startPath + '/' + file.dir
			);
		}
	}
	return files;
}

async function getFiles(path: string) {
	const files = (await readdir(path, { withFileTypes: true }))
		.filter(
			(dir) => dir.isFile() && ['readme.md'].includes(dir.name.toLowerCase())
		)
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
	const slug = first.length && !rest.length ? first : rest.join('-');
	let title = first.length && !rest.length ? first : rest.join(' ');
	title = title[0].toUpperCase() + title.slice(1);

	return { slug, title };
}
