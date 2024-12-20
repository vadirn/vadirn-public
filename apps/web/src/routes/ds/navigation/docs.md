```svelte
<Navigation links={[
		{ title: 'Notes', href: app.notes.toString() },
		{ title: 'Github', href: 'https://github.com/vadirn', blank: true },
		{ title: 'About', href: app.about.toString() },
	]} />
```