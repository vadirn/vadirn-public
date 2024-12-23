import { on } from 'svelte/events';
import { createSubscriber } from 'svelte/reactivity';
import { isNonEmptyString } from '@libs/standard/string';

export class PersistedState {
	#storage = getStorage();
	#version = $state(0);
	#subscribe: () => void;
	#fallbackValue: string | null;

	constructor(readonly key: string, fallbackValue: string | null = null) {
		this.#fallbackValue = fallbackValue;
		this.#subscribe = createSubscriber((update) => {
			const off = on(window, 'storage', (event) => {
				if (event.key === this.key) {
					update();
				}
			});

			return off;
		});
	}

	get value(): string | null {
		this.#subscribe(); // track external updates
		void this.#version; // track internal updates

		return this.#storage.getItem(this.key) ?? this.#fallbackValue ?? null;
	}

	set value(value: string) {
		this.#version += 1;

		if (isNonEmptyString(value)) {
			this.#storage.setItem(this.key, value);

			return;
		}

		this.#storage.removeItem(this.key);
	}
}

type Storage = {
	getItem(key: string): string | null;
	setItem(key: string, value: string): void;
	removeItem(key: string): void;
};

const noopStorage: Storage = {
	getItem: () => null,
	setItem: () => {},
	removeItem: () => {},
};

function getStorage(): Storage {
	if (typeof window !== 'undefined') {
		return window.localStorage;
	}

	return noopStorage;
}
