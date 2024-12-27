<script lang="ts">
	import { Meta } from '@ui/components/meta';
	import { getMeta } from '$lib/cache/meta';
	import Text from './text.md';

	const description
		= 'Explore the four reasons for code change and '
			+ 'their relation to conventional commit prefixes.';
</script>

<Meta {...getMeta({ description })}/>
<Text />
