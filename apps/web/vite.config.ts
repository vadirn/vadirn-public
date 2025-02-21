import { sveltekit } from '@sveltejs/kit/vite';
import { monorepo } from '@tools/monorepo';
import { defineConfig } from 'vite';
import postcss from './postcss.config';

export default defineConfig({
	plugins: [
		sveltekit(),
	],
	css: { postcss },
	server: {
		fs: {
			allow: [monorepo.ui('theme', 'src', 'assets')],
		},
	},
});
