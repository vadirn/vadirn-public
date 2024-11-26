import { describe, expect, it, vi } from '@workspace/testing';
import { AbstractStateController, stateController } from './index.svelte';
import type { Fn } from '@workspace/standard/function';

describe('state controller', () => {
	it('allows basic transitions', async () => {
		const buttonController = stateController('idle', {
			idle: {
				click: vi.fn(async () => {
					buttonController.set('loading');
					await Promise.resolve();
					buttonController.set('idle');
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
	it('allows inheriting from abstract state controller', async () => {
		type ButtonControllerStateMethods = {
			idle: {
				click: Fn<Promise<void>>;
			};
			loading: {};
		};
		class ButtonController extends
			AbstractStateController<ButtonControllerStateMethods> {
			count = 0;

			protected constructor() {
				super('idle', {
					idle: {
						click: async () => {
							this.set('loading');
							this.count += 1;
							await Promise.resolve();
							this.set('idle');
						},
					},
					loading: {},
				});
			}

			static create() {
				return new this().attachMethods();
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
