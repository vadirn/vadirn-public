/* eslint-disable @stylistic/quote-props */
import { getSizeVar } from '../variables/sizes';

const sizes = {
	'0': getSizeVar('0'),
	'1': getSizeVar('1'),
	'2': getSizeVar('2'),
	'4': getSizeVar('4'),
	'8': getSizeVar('8'),
	'16': getSizeVar('16'),
	'20': getSizeVar('20'),
	'24': getSizeVar('24'),
	'32': getSizeVar('32'),
	'40': getSizeVar('40'),
	'48': getSizeVar('48'),
	'56': getSizeVar('56'),
	'64': getSizeVar('64'),
	'72': getSizeVar('72'),
	'80': getSizeVar('80'),
	'96': getSizeVar('96'),
	'128': getSizeVar('128'),
	'144': getSizeVar('144'),
	'192': getSizeVar('192'),
	'prose': getSizeVar('prose'),
};

export const width = {
	...sizes,
	auto: 'auto',
	full: '100%',
	screen: '100vw',
	fit: 'fit-content',
	min: 'min-content',
	max: 'max-content',
};

export const minWidth = width;
export const maxWidth = width;

export const height = {
	...sizes,
	auto: 'auto',
	full: '100%',
	svh: '100svh',
	dvh: '100dvh',
};

export const minHeight = height;
export const maxHeight = height;

export const spacing = {
	...sizes,
	auto: 'auto',
	none: 0,
};
