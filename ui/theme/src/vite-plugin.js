import UnoVite from 'unocss/vite';

/** @returns {import('vite').PluginOption} */
export function unocssPlugin({
	configFile,
}) {
	return UnoVite({
		configFile,
	});
}
