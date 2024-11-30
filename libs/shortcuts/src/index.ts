import {
	getPressedKeys,
	getShortcutName,
	listenerOptions,
	normalizeScopeHierarchy,
	normalizeShortcut,
} from './utils';

export class Shortcuts {
	private shortcuts = new Map<string, (event: KeyboardEvent) => unknown>();
	readonly scopeHierarchy: string[];
	constructor(scopeHierarchy: string[], readonly isBrowser: boolean) {
		this.scopeHierarchy = normalizeScopeHierarchy(scopeHierarchy);
	}

	private handleKeyDown = (event: KeyboardEvent) => {
		const pressedKeys = getPressedKeys(event);

		for (const scope of this.scopeHierarchy) {
			const shortcutName = getShortcutName(pressedKeys, scope);

			const callback = this.shortcuts.get(shortcutName);

			if (callback) {
				callback(event);

				return;
			}
		}
	};

	private startListening() {
		if (this.isBrowser) {
			document.addEventListener(
				'keydown',
				this.handleKeyDown,
				listenerOptions,
			);
		}
	}

	private stopListening() {
		if (this.isBrowser) {
			document.removeEventListener(
				'keydown',
				this.handleKeyDown,
			);
		}
	}

	add(
		shortcut: string,
		callback: (event: KeyboardEvent) => void,
		scope?: typeof this.scopeHierarchy[number],
	) {
		const shortcutName = getShortcutName(
			normalizeShortcut(shortcut),
			scope,
		);

		if (this.shortcuts.has(shortcutName)) {
			console.warn(`Shortcut "${shortcutName}" already exists`);
		}

		this.shortcuts.set(shortcutName, callback);

		this.startListening();
	}

	remove(shortcut: string, scope?: typeof this.scopeHierarchy[number]) {
		const shortcutName = getShortcutName(
			normalizeShortcut(shortcut),
			scope,
		);

		this.shortcuts.delete(shortcutName);
		if (this.shortcuts.size === 0) this.stopListening();
	}
}
