const emojis = [
	'👨‍💻', '⛷️', '🎾', '👾',
] as const;

export const Emoji = {
	Code: 0,
	Ski: 1,
	Ball: 2,
	Game: 3,
} as const;

export class LogoState {
	index: number = $state(0);
	emoji: string = $derived.by(() => emojis[this.index] as string);

	updateIndex = () => {
		this.index = (this.index + 1) % emojis.length;
	};
}
