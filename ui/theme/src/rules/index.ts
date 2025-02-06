import { colorRules } from './color';
import { sizeRules } from './size';
import { typographyRules } from './typography';

export const rules = [...colorRules, ...sizeRules, ...typographyRules];
