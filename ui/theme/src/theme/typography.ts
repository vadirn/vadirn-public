/* eslint-disable @stylistic/quote-props */
import {
	getFontFamilyVar,
	getFontSizeVar,
	getFontWeightVar,
	getLetterSpacingVar,
	getLineHeightVar,
} from '../variables/typography';

export const fontFamily = {
	sans: getFontFamilyVar('sans'),
	mono: getFontFamilyVar('mono'),
};

export const fontSize = {
	title: getFontSizeVar('title'),
	heading: getFontSizeVar('heading'),
	body: getFontSizeVar('body'),
	mono: getFontSizeVar('mono'),
	small: getFontSizeVar('small'),
};

export const lineHeight = {
	title: getLineHeightVar('title'),
	heading: getLineHeightVar('heading'),
	body: getLineHeightVar('body'),
	small: getLineHeightVar('small'),
};

export const fontWeight = {
	thin: getFontWeightVar('thin'),
	extralight: getFontWeightVar('extralight'),
	light: getFontWeightVar('light'),
	normal: getFontWeightVar('normal'),
	medium: getFontWeightVar('medium'),
	semibold: getFontWeightVar('semibold'),
	bold: getFontWeightVar('bold'),
	extrabold: getFontWeightVar('extrabold'),
	black: getFontWeightVar('black'),
	'100': getFontWeightVar('100'),
	'200': getFontWeightVar('200'),
	'300': getFontWeightVar('300'),
	'400': getFontWeightVar('400'),
	'500': getFontWeightVar('500'),
	'600': getFontWeightVar('600'),
	'700': getFontWeightVar('700'),
	'800': getFontWeightVar('800'),
	'900': getFontWeightVar('900'),
};

export const letterSpacing = {
	tight: getLetterSpacingVar('tight'),
	normal: getLetterSpacingVar('normal'),
	wide: getLetterSpacingVar('wide'),
};
