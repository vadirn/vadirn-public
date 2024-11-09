const emoji = [
	'👨‍💻', '⛷️', '🎾', '👾',
] as const;

export class LogoState {
	index: number = $state(0);
	emoji: string = $derived.by(() => emoji[this.index] as string);

	updateIndex = () => {
		this.index = (this.index + 1) % emoji.length;
		console.log(this.index, this.emoji);
	};
}
