import { rem } from '../utils/style';
import { baseSize } from './sizes';

export { fontFamily } from '@unocss/preset-mini/theme';

export const fontSize = {
	title: rem(34),
	heading: rem(20),
	body: rem(16),
	small: rem(12),
};

export const lineHeight = {
	title: baseSize[40],
	heading: baseSize[24],
	body: baseSize[20],
	small: baseSize[16],
};

export const fontWeight = {
	thin: '100',
	extralight: '200',
	light: '300',
	normal: '400',
	medium: '500',
	semibold: '600',
	bold: '700',
	extrabold: '800',
	black: '900',
	100: '100',
	200: '200',
	300: '300',
	400: '400',
	500: '500',
	600: '600',
	700: '700',
	800: '800',
	900: '900',
};
