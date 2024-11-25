import { describe, expect, it, vi } from '@workspace/testing';
import { stateController } from './index.svelte';

describe('state controller', () => {
	it('basic transition', async () => {
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
});
