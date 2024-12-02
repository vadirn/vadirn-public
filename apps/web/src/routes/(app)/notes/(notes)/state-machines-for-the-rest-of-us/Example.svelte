<script lang="ts">
	import { sleep } from '@libs/standard/promise';
	import { stateController } from '@libs/state-controller';

	let clicks = $state(0);

	const buttonController = stateController('idle', {
		idle: {
			click: async () => {
				buttonController.state = 'loading';
				try {
					clicks += 1;
					await sleep(800);
					if (clicks % 2 === 0) throw new Error('💥');
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

<div class="flex items-center gap-16">
	<button
		class="min-w-fit w-[240px]"
		class:bg-error={buttonController.state === 'error'}
		class:bg-success={buttonController.state === 'success'}
		class:text-gray-100={
			['success', 'error'].includes(buttonController.state)
		}
		onclick={buttonController.click}
	>
		{label}
	</button>
	<ul class="text-caption font-mono p-8 border-l border-neutral-400">
		<li>State: {buttonController.state}</li>
		<li>Clicks: {clicks}</li>
	</ul>
</div>
