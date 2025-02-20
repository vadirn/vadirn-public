import postcssGlobalData from '@csstools/postcss-global-data';
import { purgeCSSPlugin } from '@fullhuman/postcss-purgecss';
import { monorepo } from '@tools/monorepo';
import postcss from 'postcss';
import postcssImport from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';
import { svelteExtractor } from './postcss/svelteExtractor.js';

export function postcssConfig() {
	return postcss([
		postcssImport(),
		postcssGlobalData({
			files: [monorepo.ui('theme/src/css/media.css')],
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
						'**/*.svelte',
						'**/*.html',
						'**/*.md',
						'**/*.js',
						'**/*.ts',
					],
					safelist: [/^(?!\.)\w+$/],
					defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
					extractors: [
						{
							extensions: ['.svelte'],
							extractor: svelteExtractor,
						},
					],
					sourceMap: true,
				}).OnceExit(root, { result });
			},
		},
	]);
}
