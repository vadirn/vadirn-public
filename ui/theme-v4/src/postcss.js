import postcss from 'postcss';
import tailwind from '@tailwindcss/postcss';

export function postcssConfig() {
	return postcss([
		tailwind(),
	]);
}
