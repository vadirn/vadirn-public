<script lang="ts">
	import type {
		MetaTags,
	} from './types';

	type Props = MetaTags;

	const {
		title,
		description,
		canonical,
		robots,
		keywords,
		openGraph,
		twitter,
	}: Props = $props();
</script>

<svelte:head>
	<title>{title}</title>
	{#if canonical}
		<link href={canonical} rel="canonical" />
	{/if}
	{#if description}
		<meta name="description" content={description} />
	{/if}
	{#if robots}
		<meta name="robots" content={robots} />
	{/if}
	{#if keywords}
		<meta name="keywords" content={keywords} />
	{/if}

	{#if openGraph}
		{#if openGraph.title}
			<meta content={openGraph.title} property="og:title" />
		{/if}
		{#if openGraph.type}
			<meta content={openGraph.type} property="og:type" />
		{/if}
		{#if openGraph.image}
			<meta content={openGraph.image} property="og:image" />
		{/if}
		{#if openGraph.url}
			<meta content={openGraph.url} property="og:url" />
		{/if}
		{#if openGraph.description}
			<meta content={openGraph.description} property="og:description" />
		{/if}
	{/if}

	{#if twitter}
		{#if twitter.card}
			<meta name="twitter:card" content={twitter.card} />
		{/if}
		{#if twitter.site}
			<meta name="twitter:site" content={twitter.site} />
		{/if}
		{#if twitter.creator}
			<meta name="twitter:creator" content={twitter.creator} />
		{/if}
		{#if twitter.title}
			<meta name="twitter:title" content={twitter.title} />
		{/if}
		{#if twitter.description}
			<meta name="twitter:description" content={twitter.description} />
		{/if}
		{#if twitter.image}
			<meta name="twitter:image" content={twitter.image} />
		{/if}
	{/if}
</svelte:head>
