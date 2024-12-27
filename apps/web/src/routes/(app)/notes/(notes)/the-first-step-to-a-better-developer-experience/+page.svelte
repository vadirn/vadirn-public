<script lang="ts">
	import { Meta } from '@ui/components/meta';
	import { getMeta } from '$lib/cache/meta';
	import Text from './text.md';

	const description
		= 'Learn why uninterrupted focus time is '
			+ 'essential for enhancing developer experience,';
</script>

<Meta {...getMeta({ description })}/>
<Text />
