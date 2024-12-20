import { rem } from '../utils/style';

export const baseSize = {
	0: rem(0),
	1: rem(1),
	2: rem(2),
	4: rem(4),
	8: rem(8),
	16: rem(16),
	20: rem(20),
	24: rem(24),
	32: rem(32),
	40: rem(40),
	48: rem(48),
	56: rem(56),
	64: rem(64),
	72: rem(72),
	80: rem(80),
	96: rem(96),
	128: rem(128),
	144: rem(144),
	192: rem(192),
	prose: '65ch',
};

export const width = {
	...baseSize,
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
	...baseSize,
	auto: 'auto',
	full: '100%',
	screen: '100svh',
};

export const minHeight = height;
export const maxHeight = height;

export const spacing = {
	...baseSize,
	none: 0,
};
