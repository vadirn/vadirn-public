import { darkMode } from './dark';
import { pseudoClasses } from './pseudo-classes';
import { media } from './media';

export const variants = [
	...darkMode,
	...pseudoClasses,
	...media,
];
