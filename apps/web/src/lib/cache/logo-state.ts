import { LogoState } from '@workspace/components/logo';
import { getOrCreate, Keys } from './cache';

export const getLogoState
	= () => getOrCreate(Keys.LogoState, () => new LogoState());
