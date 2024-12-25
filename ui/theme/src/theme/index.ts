import { colors } from './colors';
import * as fonts from './fonts';
import * as media from './media';
import * as sizes from './sizes';
import * as visual from './visual';
import * as preflight from './preflight';

export const theme = {
	colors,
	...fonts,
	...sizes,
	...media,
	...visual,
	...preflight,
};

export type Theme = typeof theme;
