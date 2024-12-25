import { LogoState } from '@ui/components/logo';
import { getOrCreate, Keys } from './cache';

export const getLogoState
	= () => getOrCreate(Keys.LogoState, () => new LogoState());
