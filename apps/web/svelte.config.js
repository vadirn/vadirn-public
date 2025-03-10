import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { monorepo } from '@tools/monorepo';
import { escapeSvelte, mdsvex } from 'mdsvex';
import { createHighlighter } from 'shiki';
import { svelteLocalSelector } from '@tools/svelte-local-selector';

const highlighter = await createHighlighter({
	themes: ['github-light', 'github-dark'],
	langs: ['javascript', 'typescript', 'svelte'],
});

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
	highlight: {
		highlighter: async (code, lang = 'text') => {
			const html
				= escapeSvelte(highlighter.codeToHtml(code, {
					lang,
					themes: {
						light: 'github-light',
						dark: 'github-dark',
					},
				}));

			return `{@html \`${html}\` }`;
		},
	},
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [mdsvex(mdsvexOptions), svelteLocalSelector(), vitePreprocess()],

	kit: {
		adapter: adapter(),
	},

	typescript: {
		config(config) {
			config.extends = monorepo.tools('tsconfig', 'src', 'base.json');

			config.compilerOptions.rootDir = monorepo.root;
			config.compilerOptions.moduleResolution = 'Bundler';
			config.compilerOptions.emitDeclarationOnly = false;

			return config;
		},
	},

	compilerOptions: {
		runes: true,
	},
};

export default config;
