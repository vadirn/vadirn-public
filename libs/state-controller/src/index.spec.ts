import { describe, expect, it, vi } from '@tools/testing';
import {
	attachMethods,
	stateController,
} from './index.svelte';
import type { AnyFn } from '@libs/standard/function';

describe('state controller', () => {
	it('allows basic transitions (class)', async () => {
		const buttonController = stateController('idle', {
			idle: {
				click: vi.fn(async () => {
					buttonController.state = 'loading';
					await Promise.resolve();
					buttonController.state = 'idle';
				}),
			},
			loading: {},
		});

		expect(buttonController.state).toBe('idle');
		buttonController.click();
		expect(buttonController.state).toBe('loading');
		buttonController.click();
		expect(
			buttonController.stateMethods.idle.click,
		).toHaveBeenCalledTimes(1);
		await Promise.resolve();
		expect(buttonController.state).toBe('idle');
	});
	it('allows basic transitions (object)', async () => {
		const stateController = <
			SM extends Record<string, Record<string, AnyFn>>,
		>(
			defaultState: keyof SM,
			stateMethods: SM) => {
			let state = defaultState;

			const stateController = {
				get state() {
					return state;
				},
				set state(value: keyof SM) {
					state = value;
				},
			};

			return attachMethods(stateController, stateMethods);
		};

		const buttonController = stateController('idle', {
			idle: {
				click: vi.fn(async () => {
					buttonController.state = 'loading';
					await Promise.resolve();
					buttonController.state = 'idle';
				}),
			},
			loading: {},
		});

		expect(buttonController.state).toBe('idle');
		buttonController.click();
		expect(buttonController.state).toBe('loading');
		buttonController.click();
		expect(
			buttonController.stateMethods.idle.click,
		).toHaveBeenCalledTimes(1);
		await Promise.resolve();
		expect(buttonController.state).toBe('idle');
	});
	it('allows custom state controller', async () => {
		class ButtonController {
			state: keyof this['stateMethods'] = 'idle';
			count = 0;
			stateMethods = {
				idle: {
					click: async () => {
						this.state = 'loading';
						this.count += 1;
						await Promise.resolve();
						this.state = 'idle';
					},
				},
				loading: {},
			};

			protected constructor() {}

			static create() {
				const instance = new this();

				return attachMethods(instance, instance.stateMethods);
			}
		}

		const buttonController = ButtonController.create();

		expect(buttonController.state).toBe('idle');
		buttonController.click();
		expect(buttonController.state).toBe('loading');
		buttonController.click();
		expect(buttonController.count).toBe(1);
		await Promise.resolve();
		expect(buttonController.state).toBe('idle');
	});
});
