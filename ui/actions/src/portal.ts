export const Layers = {
	None: 'none',
	App: 'app',
	Modals: 'modals',
};

export type Layer = (typeof Layers)[keyof typeof Layers];

export function getLayer(layer: Layer) {
	if (layer === Layers.App) return document.getElementById('app');
	if (layer === Layers.Modals) return document.getElementById('modals');

	return document.body;
}

export function portal(node: HTMLElement, layer: Layer = Layers.None) {
	const layerElement = getLayer(layer);

	layerElement?.appendChild(node);

	return {
		destroy() {
			if (node.parentNode) node.parentNode.removeChild(node);
		},
	};
}
