import { Shortcuts } from '@workspace/shortcuts';
import { getOrCreate, Keys } from './cache';
import { browser } from '$app/environment';

export function getShortcuts() {
	return getOrCreate(Keys.Shortcuts, () => new Shortcuts([], browser));
}