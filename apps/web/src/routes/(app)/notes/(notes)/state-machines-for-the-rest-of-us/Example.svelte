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
		onclick={buttonController.click}
	>
		{label}
	</button>
	<ul class="text-small font-mono p-8 border-l border-neutral-400">
		<li>State:
			<span
				class:text-green-400={buttonController.state === 'success'}
				class:text-red-400={buttonController.state === 'error'}
				class:text-yellow-400={buttonController.state === 'loading'}>
				{buttonController.state}
			</span>
		</li>
		<li>Clicks: {clicks}</li>
	</ul>
</div>
