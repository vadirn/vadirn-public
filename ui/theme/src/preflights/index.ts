import { variablesPreflight } from './variables';
import { resetPreflight } from './reset';
import { defaultsPreflight } from './defaults';
import type { Preflight } from 'unocss';
import type { Theme } from '../theme';

export const preflights: Preflight<Theme>[] = [
	resetPreflight,
	variablesPreflight,
	defaultsPreflight,
];
