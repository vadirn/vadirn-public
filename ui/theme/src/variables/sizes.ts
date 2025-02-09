import { assert } from '@libs/standard/error';
import { isPropertyOf } from '@libs/standard/object';
import { cssVar, rem } from '../utils/style';

export const sizes = {
	'--size-0': rem(0),
	'--size-1': rem(1),
	'--size-2': rem(2),
	'--size-4': rem(4),
	'--size-8': rem(8),
	'--size-16': rem(16),
	'--size-20': rem(20),
	'--size-24': rem(24),
	'--size-32': rem(32),
	'--size-40': rem(40),
	'--size-48': rem(48),
	'--size-56': rem(56),
	'--size-64': rem(64),
	'--size-72': rem(72),
	'--size-80': rem(80),
	'--size-96': rem(96),
	'--size-128': rem(128),
	'--size-144': rem(144),
	'--size-192': rem(192),
	'--size-prose': '65ch',
	'--size-full': '100%',
	'--size-screen': '100vw',
} as const;

type ExtractSizeKey<T> = T extends `--size-${infer K}` ? K : never;
type SizeKey = ExtractSizeKey<keyof typeof sizes>;

export const getSizeVar = (key: SizeKey) => {
	const sizeVariable = `--size-${key}`;

	assert(sizeVariable in sizes, `Invalid size key: ${sizeVariable}`);

	return cssVar(sizeVariable);
};

export const getSizeValue = (key: SizeKey) => {
	const sizeVariable = `--size-${key}`;

	if (isPropertyOf(sizes, sizeVariable)) {
		return sizes[sizeVariable];
	}

	throw new Error(`Invalid size key: ${sizeVariable}`);
};
