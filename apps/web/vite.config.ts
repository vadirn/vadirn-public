import { sveltekit } from '@sveltejs/kit/vite';
import { monorepo } from '@tools/monorepo';
import { unocssPlugin } from '@ui/theme/vite';
import { defineConfig } from 'vite';
import postcss from './postcss.config';

export default defineConfig({
	plugins: [
		unocssPlugin({
			configFile: './uno.config.ts',
		}),
		sveltekit(),
	],
	css: { postcss },
	server: {
		fs: {
			allow: [monorepo.ui('theme', 'src', 'assets')],
		},
	},
});
