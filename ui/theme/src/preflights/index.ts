import { resetPreflight } from './reset';
import { variablesPreflight } from './variables';
import type { Preflight } from 'unocss';
import type { Theme } from '../theme';

export const preflights: Preflight<Theme>[] = [
	resetPreflight,
	variablesPreflight,
];
