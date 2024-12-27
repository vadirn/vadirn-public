<script lang="ts">
	import type { DeepPartial } from '@libs/standard/type';
	import type {
		MetaTags,
	} from './types';

	type Props = DeepPartial<MetaTags>;

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
	{#if title}
		<title>{title}</title>
	{/if}
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
		{#if openGraph.site_name}
			<meta content={openGraph.site_name} property="og:site_name" />
		{/if}
	{/if}

	{#if twitter}
		{#if twitter.card}
			<meta name="twitter:card" content={twitter.card} />
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
