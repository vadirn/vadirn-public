<script lang="ts">
	import Example from './Example.svelte';
</script>

Let's say we have a button that should have 4 distinct appearances (states):

- `idle`
- `loading`
- `success`
- `error`

While the button is `idle`, it can be clicked and switches to `loading` state. Once the loading is done, it switches to `success` or `error` state and remains there until clicked again.

We dismiss the option of using flags because it can easily cause confusion. While ready-made abstractions like xstate or machina.js are available, they are a bit too verbose for the use-case. A simple description of states and the methods available for each state would suffice. For example:

<div class="code">

```ts
const buttonController = stateController('idle', {
	idle: {
		click: async () => {
			buttonController.state = 'loading'; 
			try {
				// ... do something
				buttonController.state = 'success';
			}
			catch {
				buttonController.state = 'error';
			}
		},
	},
	loading: {},
	success: {
		click: () => { buttonController.state = 'idle'; },
	},
	error: {
		click: () => { buttonController.state = 'idle'; },
	},
});

buttonController.click(); // switches to loading, then success or error
```

</div>

<Example />

The implementation is fairly straightforward. The only tricky part is getting the types right.

## Types

State methods are provided as an argument, but then are usable as properties of the controller instance. This requires us to be able to get all the methods combined.

<div class="code">

```ts
type StateMethods = Record<string, Record<string, AnyFn>>;
type State<SM extends StateMethods> = keyof SM;

// SM[keyof SM] would give a union type { ... } | { ... }
// but we need an intersection { ... } && { ... }
// to get all the methods combined
// luckily there is a way to do this: 
// https://stackoverflow.com/questions/50374908/transform-union-type-to-intersection-type
type UnionToIntersection<U> =
	(U extends any ? (k: U) => void : never) extends
	(k: infer I extends U) => void ? I : never;

// this way we get
type Methods<SM extends StateMethods> = UnionToIntersection<SM[keyof SM]>;

// eventually we'd need controller to have its own type intersected with Methods<StateMethods>
```

</div>

## State Controller as an Object

The state controller can be constructed manually from a regular object. As simple as it gets, using Svelte runes to store the state:

<div class="code">

```ts
export function stateController<SM extends StateMethods>(
	defaultState: State<SM>,
	stateMethods: SM,
) {
	let state = $state<keyof SM>(defaultState);

	const stateController = {
		get state() {
			return state;
		},
		set state(value: State<SM>) {
			state = value;
		},
		get stateMethods() {
			return stateMethods;
		},
	};

	for (const stateKey of Object.keys(stateMethods)) {
		for (const methodKey of Object.keys(stateMethods[stateKey]!)) {
			if (methodKey in stateController) continue; // skip if already exists

			(stateController as any)[methodKey] = (...args: any[]) => {
				const availableMethods = stateMethods[state]; 

				return availableMethods?.[methodKey]?.(...args);
			};
		}
	}

	return stateController as typeof stateController & Methods<SM>;
}
```

</div>

## State Controller as a Class

This solution is a bit more verbose. In order to get state methods into the instance type, we have to use a separate method that returns `typeof this & Methods<SM>`. So we also have to use a static factory method to get the correctly typed instances. This makes it impossible to only have one class and extend from it, since static methods wouldn't provide the correct type for the child classes.

<div class="code">

```ts
export abstract class AbstractStateController<SM extends StateMethods> {
	state = $state<keyof SM>();

	protected constructor(defaultState: State<SM>, readonly stateMethods: SM) {
		this.state = defaultState;
	}

	protected attachMethods = () => {
		for (const stateKey of Object.keys(this.stateMethods)) {
			for (const methodKey of Object.keys(this.stateMethods[stateKey]!)) {
				if (methodKey in this) continue; // skip if already exists

				(this as any)[methodKey] = (...args: any[]) => {
					const availableMethods = this.stateMethods[this.state!];

					return availableMethods?.[methodKey]?.(...args);
				};
			}
		}

		return this as typeof this & Methods<SM>;
	};
}

export class StateController<SM extends StateMethods>
	extends AbstractStateController<SM> {
	protected constructor(defaultState: State<SM>, stateMethods: SM) {
		super(defaultState, stateMethods);
	}

	static create<SM extends StateMethods>(
		defaultState: State<SM>,
		stateMethods: SM,
	) {
		return new this(defaultState, stateMethods).attachMethods();
	}
}

export function stateController<SM extends StateMethods>(
	defaultState: State<SM>,
	stateMethods: SM,
) {
	return StateController.create(defaultState, stateMethods);
}
```

</div>

Let's try to implement `ButtonController` class (from the very beginning of this note):

<div class="code">

```ts
type ButtonControllerStateMethods = {
	idle: {
		click: () => Promise<void>;
	};
	loading: {};
	success: {
		click: () => void;
	},
	error: {
		click: () => void;
	}
};

class ButtonController extends
	AbstractStateController<ButtonControllerStateMethods> {

	protected constructor() {
		super('idle', {
			idle: {
				click: async () => {
					this.state = 'loading'; 
					try {
						// ... do something
						this.state = 'success';
					}
					catch {
						this.state = 'error';
					}
				},
			},
			loading: {},
			success: {
				click: () => { this.state = 'idle'; },
			},
			error: {
				click: () => { this.state = 'idle'; },
			},
		});
	}

	static create() {
		return new this().attachMethods();
	}
}
```

</div>

## Conclusion

The choice between the two solutions is yours. You still benefit from autocompletion and type safety, and it's less verbose than using a state machine library.