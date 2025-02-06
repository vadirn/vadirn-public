import { assert } from '@libs/standard/error';
import { cssVar, px, rem } from '../utils/style';

export const borderRadii = {
	'--radius-none': '0',
	'--radius-4': rem(4),
	'--radius-8': rem(8),
	'--radius-12': rem(12),
	'--radius-16': rem(16),
	'--radius-full': '9999px',
};

type ExtractBorderRadiusKey<T> = T extends `--radius-${infer K}` ? K : never;
type BorderRadiusKey = ExtractBorderRadiusKey<keyof typeof borderRadii>;

export const getBorderRadiusVar = (key: BorderRadiusKey) => {
	const borderRadiusVariable = `--radius-${key}`;

	assert(
		borderRadiusVariable in borderRadii,
		`Invalid border radius key: ${borderRadiusVariable}`,
	);

	return cssVar(borderRadiusVariable);
};

export const lineWidths = {
	'--line-width-none': '0',
	'--line-width-thin': px(0.5),
	'--line-width-1': px(1),
	'--line-width-2': px(2),
	'--line-width-8': px(8),
};

type ExtractLineWidthKey<T> = T extends `--line-width-${infer K}` ? K : never;
type LineWidthKey = ExtractLineWidthKey<keyof typeof lineWidths>;

export const getLineWidthVar = (key: LineWidthKey) => {
	const lineWidthVariable = `--line-width-${key}`;

	assert(
		lineWidthVariable in lineWidths,
		`Invalid line width key: ${lineWidthVariable}`,
	);

	return cssVar(lineWidthVariable);
};

export const boxShadows = {
	'--shadow-modal': [
		'0 10px 15px -3px oklch(0 0 0 / 0.2)',
		'0 4px 6px -4px oklch(0 0 0 / 0.4)',
	].join(', '),
};

type ExtractBoxShadowKey<T> = T extends `--shadow-${infer K}` ? K : never;
type BoxShadowKey = ExtractBoxShadowKey<keyof typeof boxShadows>;

export const getBoxShadowVar = (key: BoxShadowKey) => {
	const boxShadowVariable = `--shadow-${key}`;

	assert(
		boxShadowVariable in boxShadows,
		`Invalid box shadow key: ${boxShadowVariable}`,
	);

	return cssVar(boxShadowVariable);
};
