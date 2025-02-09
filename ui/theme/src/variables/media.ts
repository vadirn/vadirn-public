import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { assert } from '@libs/standard/error';

// read from ../css/media.css
const __dirname = dirname(fileURLToPath(import.meta.url));
const css = readFileSync(join(__dirname, '../css/media.css'), 'utf-8');

export const mediaQueries = css.split('\n').reduce((acc, line) => {
	const [key, value] = line.replace('@custom-media', '').trim().split(' ');

	if (key && value) {
		acc[key] = value;
	}

	return acc;
}, {} as Record<string, string>);

// export const mediaQueries = {
// 	'--portrait': '(orientation: portrait)',
// 	'--landscape': '(orientation: landscape)',
// 	'--lt-tablet': '(max-width: 1023px)',
// 	'--gt-tablet': '(min-width: 1024px)',
// };

type ExtractMediaQueryKey<T> = T extends `--${infer K}` ? K : never;
type MediaQueryKey = ExtractMediaQueryKey<keyof typeof mediaQueries>;

export const getMediaQueryVar = (key: MediaQueryKey) => {
	const mediaQuery = `--${key}`;

	assert(
		mediaQuery in mediaQueries,
		`Invalid media query key: ${mediaQuery}`,
	);

	return mediaQuery;
};
