import postcssGlobalData from '@csstools/postcss-global-data';
import { monorepo } from '@tools/monorepo';
import postcss from 'postcss';
import postcssImport from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';
import { purgeCSSPlugin } from '@fullhuman/postcss-purgecss';
import { svelteExtractor } from './extractor.js';

export function postcssConfig() {
	return postcss([
		postcssImport(),
		postcssGlobalData({
			files: [monorepo.ui('theme-next/src/css/media.css')],
		}),
		postcssPresetEnv({
			stage: 0,
			features: {
				'custom-properties': false,
				'oklab-function': false,
			},
		}),
		// Only apply PurgeCSS when processing .css files
		{
			postcssPlugin: 'conditional-purgecss',
			OnceExit(root, { result }) {
				const file = result.opts.from;

				if (!file.split('?')[0].endsWith('.css')) {
					return;
				}

				return purgeCSSPlugin({
					content: [
						monorepo.ui('components/src/**/*.svelte'),
						monorepo.apps('web/src/**/*.svelte'),
					],
					safelist: [/^(?!\.)\w+$/],
					defaultExtractor: svelteExtractor,
					sourceMap: true,
				}).OnceExit(root, { result });
			},
		},
	]);
}
