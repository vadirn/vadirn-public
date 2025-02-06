import SvelteScopedVite from '@unocss/svelte-scoped/vite';

/** @returns {import('vite').PluginOption} */
export function unocssPlugin({
	configFile,
}) {
	return SvelteScopedVite({
		configFile,
	});
}
