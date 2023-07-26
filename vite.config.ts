import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit(), MDHmr()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}

	// transformInclude: /\.mx$/,
});

function MDHmr() {
	return {
		name: 'md-hmr',
		enforce: 'post' as const,
		handleHotUpdate({ file, server }: any) {
			if (file.endsWith('.md')) {
				server.ws.send({
					type: 'full-reload',
					path: '*'
				});
			}
		}
	};
}
