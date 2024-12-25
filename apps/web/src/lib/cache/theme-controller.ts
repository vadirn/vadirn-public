import { ThemeController } from '@ui/components/theme-switcher';
import { getOrCreate, Keys } from './cache';

export const getThemeController
	= () => getOrCreate(Keys.ThemeController, () => ThemeController.create());
