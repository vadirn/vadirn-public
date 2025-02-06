import postcss from 'postcss';
import postcssImport from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';

export function postcssConfig() {
	return postcss([
		postcssImport(),
		postcssPresetEnv({
			stage: 0,
			features: {
				'custom-properties': false,
				'oklab-function': false,
			},
		}),
	]);
}
