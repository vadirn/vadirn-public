import { colors } from './colors';
import * as typography from './typography';
import * as sizes from './sizes';
import * as decorative from './decorative';
import * as media from './media';

export const theme = {
	colors,
	...sizes,
	...typography,
	...decorative,
	...media,
};

export type Theme = typeof theme;
