import { colors } from './colors';
import * as typography from './typography';
import * as sizes from './sizes';
import * as decorative from './decorative';

export const theme = {
	colors,
	...sizes,
	...typography,
	...decorative,
};

export type Theme = typeof theme;
