<script lang="ts">
	import { assert } from '@libs/standard/error';

	const clamp = (min, value, max) => Math.max(min, Math.min(max, value));

	const oklch = (l: number, c: number, h: number, alpha?: number) => {
		assert(l >= 0 && l <= 100, '0 <= l <= 100');
		assert(c >= 0 && c <= 0.4, '0 <= c <= 0.4');
		assert(h >= 0 && h <= 360, '0 <= h <= 360');

		if (alpha) return `oklch(${l}% ${c} ${h} / ${alpha}%)`;

		return `oklch(${l}% ${c} ${h})`;
	};

	const getTextLightness = (l) => {
		if (l >= 60) return 0;

		return 100;
	};

	const createLightnessFromIGetter
		= (minL, maxL) => i => (maxL + (minL - maxL) * i / 8);

	const getL = createLightnessFromIGetter(20, 90);

	let hue = $state(0);
	let chroma = $state(0);

	const getColors = (chroma, hue) => {
		const colors = {};

		for (let i = 0; i < 9; i++) {
			colors[(i + 1) * 100] = oklch(getL(i), chroma, hue);
		}

		return colors;
	};
</script>

<style lang="postcss">
	ul {
		@apply flex;
	}

	li {
		@apply flex items-center justify-center;

		width: 100px;
		height: 100px;
	}
</style>

{#snippet colorBox(index, chroma, hue)}
	{@const bg = oklch(getL(index), chroma, hue)}
	{@const color = oklch(getTextLightness(getL(index)), chroma, hue)}
	<li style:background={bg} style:color>{(index + 1) * 100}</li>
{/snippet}
{#snippet tokens(label, chroma, hue)}
	{@const colors = { [label]: getColors(chroma, hue) }}
	<pre><code>{JSON.stringify(colors, null, 2)}</code></pre>
{/snippet}

<ul>
	<li>
		Grey
	</li>
	{#each { length: 9 } as _, i}
		{@render colorBox(i, 0, 0)}
	{/each}
	<li
		style:background={oklch(0, 0, 0)}
		style:color={oklch(100, 0, 0)}>
		black
	</li>
</ul>
{@render tokens('grey', 0, 0)}
<ul>
	<li>
		Red
	</li>
	{#each { length: 9 } as _, i}
		{@render colorBox(i, 0.16, 31)}
	{/each}
</ul>
{@render tokens('red', 0.16, 31)}
<ul>
	<li>
		Yellow
	</li>
	{#each { length: 9 } as _, i}
		{@render colorBox(i, 0.17, 86)}
	{/each}
</ul>
{@render tokens('yellow', 0.17, 86)}
<ul>
	<li>
		Green
	</li>
	{#each { length: 9 } as _, i}
		{@render colorBox(i, 0.13, 130)}
	{/each}
</ul>
{@render tokens('green', 0.13, 130)}
<ul>
	<li>
		Blue
	</li>
	{#each { length: 9 } as _, i}
		{@render colorBox(i, 0.13, 245)}
	{/each}
</ul>
{@render tokens('blue', 0.13, 245)}
<ul>
	<li class="flex-col p-8">
		<input
			class="max-w-full"
			max="0.4"
			min="0"
			step="0.005"
			type="range"
			bind:value={chroma} />
		<input
			class="max-w-full"
			max="360"
			min="0"
			step="1"
			type="range"
			bind:value={hue} />
	</li>
	{#each { length: 9 } as _, i}
		{@render colorBox(i, chroma, hue)}
	{/each}
</ul>
