/* eslint-disable @stylistic/quote-props */
import {
	getBorderRadiusVar,
	getBoxShadowVar,
	getLineWidthVar,
} from '../variables/decorative';

export const borderRadius = {
	'none': '0',
	'4': getBorderRadiusVar('4'),
	'8': getBorderRadiusVar('8'),
	'12': getBorderRadiusVar('12'),
	'16': getBorderRadiusVar('16'),
	'full': getBorderRadiusVar('full'),
};

export const boxShadow = {
	modal: getBoxShadowVar('modal'),
};

export const lineWidth = {
	none: getLineWidthVar('none'),
	thin: getLineWidthVar('thin'),
	1: getLineWidthVar('1'),
	2: getLineWidthVar('2'),
	8: getLineWidthVar('8'),
};
