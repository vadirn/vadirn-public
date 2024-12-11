import postcss from 'postcss';
import postcssImport from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';
import postcssGlobalData from '@csstools/postcss-global-data';

// get this file location
const __dirname = new URL('.', import.meta.url).pathname;

export function postcssConfig() {
	return postcss([
		postcssImport(),
		postcssGlobalData({
			files: [__dirname + '/css/media.css'],
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
