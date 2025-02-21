<script lang="ts">
	import { Meta } from '@ui/components/meta';
	import { getMeta } from '$lib/cache/meta';
	import Text from './text.md';

	const description
		= 'Learn how to create a "state controller" '
			+ 'to effectively manage UI component variants.';
</script>

<Meta {...getMeta({ description })}/>
<Text />
