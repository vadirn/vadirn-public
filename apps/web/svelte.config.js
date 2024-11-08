import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { monorepo } from '@workspace/monorepo';
import { escapeSvelte, mdsvex } from 'mdsvex';
import { createHighlighter } from 'shiki';

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
			= escapeSvelte(highlighter.codeToHtml(code, { lang,
				themes: {
					light: 'github-light',
					dark: 'github-dark',
				} }));

			return `{@html \`${html}\` }`;
		},
	},
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
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
};

export default config;
