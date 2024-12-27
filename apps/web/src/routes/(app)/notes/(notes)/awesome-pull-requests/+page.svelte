<script lang="ts">
	import { Meta } from '@ui/components/meta';
	import { getMeta } from '$lib/cache/meta';
	import Text from './text.md';

	const description
		= 'Learn how to bring clarity and engagement to your code reviews.';
</script>

<Meta {...getMeta({ description })}/>
<Text />
