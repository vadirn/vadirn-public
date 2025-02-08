import { colorRules } from './color';
import { displayRules } from './display';
import { positioningRules } from './positioning';
import { sizeRules } from './size';
import { spacingRules } from './spacing';
import { typographyRules } from './typography';

export const rules = [
	...colorRules,
	...sizeRules,
	...typographyRules,
	...spacingRules,
	...displayRules,
	...positioningRules,
];
