import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import type { Preflight } from 'unocss';
import type { Theme } from '../theme';

const __dirname = dirname(fileURLToPath(import.meta.url));
const reset = readFileSync(join(__dirname, '../css/reset.css'), 'utf-8');

export const resetPreflight: Preflight<Theme> = {
	getCSS: () => reset,
};
