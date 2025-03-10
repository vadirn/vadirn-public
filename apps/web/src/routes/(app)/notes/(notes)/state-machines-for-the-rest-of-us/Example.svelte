<script lang="ts">
	import { sleep } from '@libs/standard/promise';
	import { stateController } from '@libs/state-controller';
	import { Button } from '@ui/components/button';

	const LOADING_DELAY = 800;
	const ERROR_FACTOR = 2;

	let clicks = $state(0);

	const buttonController = stateController('idle', {
		idle: {
			click: async () => {
				buttonController.state = 'loading';
				try {
					clicks += 1;
					await sleep(LOADING_DELAY);
					if (clicks % ERROR_FACTOR === 0) throw new Error('💥');
					buttonController.state = 'success';
				}
				catch {
					buttonController.state = 'error';
				}
			},
		},
		loading: {},
		success: {
			click: () => { buttonController.state = 'idle'; },
		},
		error: {
			click: () => { buttonController.state = 'idle'; },
		},
	});

	const label = $derived({
		idle: 'Click me',
		loading: 'Loading...',
		success: 'Reset',
		error: 'Reset',
	}[buttonController.state]);
</script>

<style lang="postcss">
	.root {
		display: flex;
		gap: var(--size-16);
		align-items: center;
		justify-content: flex-start;
		margin-bottom: var(--line-height);
	}

	:local(.button) {
		width: 160px;
	}

	.stats {
		display: flex;
		flex-direction: column;
		gap: var(--size-4);
		margin: 0;
	}
</style>

<div class="root">
	<Button
		class={__styles().button}
		onclick={buttonController.click}
	>
		{label}
	</Button>
	<ul class="stats">
		<li>State:
			<span
				class:color-green-400={buttonController.state === 'success'}
				class:color-red-400={buttonController.state === 'error'}
				class:color-yellow-400={buttonController.state === 'loading'}>
				{buttonController.state}
			</span>
		</li>
		<li>Clicks: {clicks}</li>
	</ul>
</div>
