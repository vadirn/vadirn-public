<script lang="ts">
	import { Meta } from '@ui/components/meta';
	import Text from './text.md';
	import { getMeta } from '$lib/cache/meta';

	const description
		= 'Learn how to create a "state controller" '
			+ 'to effectively manage UI component variants.';
</script>

<Meta {...getMeta({ description })}/>
<Text />
