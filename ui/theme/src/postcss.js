import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import tailwind from 'tailwindcss';

/**
 * @typedef {import('tailwindcss').Config} TailwindConfig
 * @param {TailwindConfig} tailwindConfig
 */
export function postcssConfig(tailwindConfig) {
	return postcss([
		tailwind(tailwindConfig),
		autoprefixer,
	]);
}
