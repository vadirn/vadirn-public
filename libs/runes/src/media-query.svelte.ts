export class MediaQuery {
	#matches: boolean | undefined = $state();
	#effectSubscribers = 0;
	#media: MediaQueryList | undefined;
	
	constructor(mediaQuery: string) {
		if (typeof window === 'undefined') return;
		this.#media = window.matchMedia(mediaQuery)
	}
	
	get matches(): boolean | undefined {
		if (!this.#media) return this.#matches;

		const media = this.#media;
		
		if (!$effect.tracking()) {
			this.#matches = media.matches
			
			return this.#matches;
		}
		
		const onMediaChange = (event: MediaQueryListEvent) => {
			this.#matches = event.matches;
		}
		$effect(() => {		
			if (this.#effectSubscribers === 0) {
				// subscribe to media changes
				media.addEventListener('change', onMediaChange);
				this.#matches = media.matches;
			}
			
			this.#effectSubscribers += 1;
	
			return () => {
				this.#effectSubscribers -= 1;
				if (this.#effectSubscribers === 0) {
					// unsubscribe from media changes
					media.removeEventListener('change', onMediaChange);
				}
			}
		})

		return this.#matches;
	}
}