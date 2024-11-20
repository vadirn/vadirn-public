import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import tailwind from 'tailwindcss';
import tailwindNesting from 'tailwindcss/nesting/index.js';

/**
 * @typedef {import('tailwindcss').Config} TailwindConfig
 * @param {TailwindConfig} tailwindConfig
 */
export function postcssConfig(tailwindConfig) {
	return postcss([
		tailwindNesting(),
		tailwind(tailwindConfig),
		autoprefixer,
	]);
}
