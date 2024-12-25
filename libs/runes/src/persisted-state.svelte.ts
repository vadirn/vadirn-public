import { on } from 'svelte/events';
import { createSubscriber } from 'svelte/reactivity';
import { isNonEmptyString } from '@libs/standard/string';

export class PersistedState<Value extends string = string> {
	#storage = getStorage();
	#version = $state(0);
	#subscribe: () => void;
	#fallbackValue: string | null;

	constructor(readonly key: string, fallbackValue: Value | null = null) {
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

	get value(): Value | null {
		this.#subscribe(); // track external updates
		void this.#version; // track internal updates

		return this.#storage.getItem(this.key) as Value
			?? this.#fallbackValue
			?? null;
	}

	set value(value: Value | null) {
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
