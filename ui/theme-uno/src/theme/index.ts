import { colors } from './colors';
import * as fonts from './fonts';
import * as media from './media';
import * as sizes from './sizes';

export const theme = {
	colors,
	...fonts,
	...sizes,
	...media,
};

export type Theme = typeof theme;
