export const svelteStylisticRules = {
	files: ['**/*.svelte'],
	rules: {
		'@stylistic/indent': 'off',
		'@stylistic/indent-binary-ops': 'off',
		'svelte/indent': ['error', { indent: 'tab' }],
		'svelte/sort-attributes': [
			'warn',
			{
				order: [
					'slot',
					'this',
					'bind:this',
					'id',
					'name',
					// `--style-props` (Alphabetical order within the same group.)
					{ match: '/^--/u', sort: 'alphabetical' },
					// `style` attribute, and `style:` directives.
					['style', '/^style:/u'],
					'class',
					// `class:` directives. (Alphabetical order within the same group.)
					{ match: '/^class:/u', sort: 'alphabetical' },
					// class attribute for components
					{ match: '/^className/u', sort: 'alphabetical' },
					// other attributes. (Alphabetical order within the same group.)
					{
						match: [
							'!/:/u',
							'!/^(?:this|id|name|style|class)$/u',
							'!/^--/u',
							'!/^on/u',
						],
						sort: 'alphabetical',
					},
					// `bind:` directives (other then `bind:this`), and `on:` directives.
					['/^bind:/u', '!bind:this', '/^on:/u'],
					{ match: '/^on/u', sort: 'alphabetical' },
					// `use:` directives. (Alphabetical order within the same group.)
					{ match: '/^use:/u', sort: 'alphabetical' },
					// `transition:` directive.
					{ match: '/^transition:/u', sort: 'alphabetical' },
					// `in:` directive.
					{ match: '/^in:/u', sort: 'alphabetical' },
					// `out:` directive.
					{ match: '/^out:/u', sort: 'alphabetical' },
					// `animate:` directive.
					{ match: '/^animate:/u', sort: 'alphabetical' },
					// `let:` directives. (Alphabetical order within the same group.)
					{ match: '/^let:/u', sort: 'alphabetical' },
				],
			},
		],
		'max-lines': [
			'error',
			{
				max: 300,
				skipBlankLines: true,
				skipComments: true,
			},
		],
	},
};
