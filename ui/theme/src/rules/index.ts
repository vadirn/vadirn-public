import type { DynamicRule } from 'unocss';
import type { Theme } from '../theme';

const listRule: DynamicRule<Theme> = [
	/^list-(.+)$/,
	([, type]) => ({ 'list-style': type }),
];

export const rules = [listRule];
