import { MediaQuery } from 'svelte/reactivity';
import { PersistedState } from '@libs/runes/persisted-state';
import { attachMethods } from '@libs/state-controller';

export const Themes = {
	Light: 'light',
	Dark: 'dark',
	System: 'system',
} as const;
export type Theme = typeof Themes[keyof typeof Themes];
type PersistedTheme = typeof Themes.Light | typeof Themes.Dark;

export class ThemeController {
	theme = new PersistedState<PersistedTheme>('theme');
	mediaQuery = new MediaQuery('(prefers-color-scheme: dark)');
	state: Theme = $derived(this.theme.value ?? Themes.System);

	inDarkMode = $derived(
		this.state === Themes.Dark
		|| (this.state === Themes.System && this.mediaQuery.current),
	);

	protected constructor() {}

	static create() {
		const instance = new this();

		return attachMethods(instance, {
			[Themes.Light]: {
				toggle: () => {
					instance.theme.value = Themes.Dark;
				},
			},
			[Themes.Dark]: {
				toggle: () => {
					instance.theme.value = null;
				},
			},
			[Themes.System]: {
				toggle: () => {
					instance.theme.value = Themes.Light;
				},
			},
		});
	}
}

export type ThemeControllerInstance = ReturnType<typeof ThemeController.create>;
