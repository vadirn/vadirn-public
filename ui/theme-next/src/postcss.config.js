import postcssGlobalData from '@csstools/postcss-global-data';
import { monorepo } from '@tools/monorepo';
import postcss from 'postcss';
import postcssImport from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';

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
	]);
}
