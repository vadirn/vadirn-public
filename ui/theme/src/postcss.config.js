import postcss from 'postcss';
import postcssImport from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';
import postcssUno from '@unocss/postcss';

export function postcssConfig() {
	return postcss([
		postcssImport(),
		postcssUno(),
		postcssPresetEnv({
			stage: 0,
			features: {
				'custom-properties': false,
				'oklab-function': false,
			},
		}),
	]);
}
