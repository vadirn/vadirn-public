<script lang="ts">
	import Example from './Example.svelte';
	import selfFive from './self-five.webp';
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

State methods are provided as an argument, but then are usable as properties of the controller instance. This requires us to be able to get a type for all the methods combined.

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
type Controller<SM extends StateMethods> = {
	state: State<SM>;
};
```

</div>

## Extending Controller with Methods

This is the actual core functionality of the state controller. It takes the controller instance and the state methods, and returns a new controller instance with the methods attached.

<div class="code">

```ts
export function attachMethods<
	SM extends StateMethods,
	SC extends IStateController<SM>,
>(
	controller: SC,
	stateMethods: SM,
) {
	const methods = {} as Record<string, UnknownFn>;

	for (const stateKey of Object.keys(stateMethods)) {
		for (const methodKey of Object.keys(stateMethods[stateKey]!)) {
			if (methodKey in methods) continue; // skip if already exists

			methods[methodKey] = (...args) => {
				const availableMethods = stateMethods[controller.state!];

				return availableMethods?.[methodKey]?.(...args);
			};
		}
	}

	return merge(
		controller,
		{ stateMethods },
		methods as Methods<SM>,
	);
}
```

I guess Typescript had the most impact on implementation details of this one:

- We first create an empty object for the methods, so that `methods[methodKey]` wouldn't complain about type mismatch.
- Then we use `merge` function, which is just a type-safe version of `Object.assign`.
- Instead of defining `stateMethods` as a property of the `Controller` type, we provide it as an argument, this helps to properly infer generic types and avoid unexpected type errors. Otherwise we'd need to explicitly set the types as in `attachMethods<SM, Controller<SM>>(stateController)`.
- We also merge `stateMethods` into the controller, so that it would be available as a property of the instance, making it possible to reuse the methods.

</div>

Now we can experiment with the controller itself.

## State Controller as an Object

The state controller can be constructed manually from a regular object. As simple as it gets, using Svelte runes to store the state:

<div class="code">

```ts
function stateController<SM extends StateMethods>(
	defaultState: State<SM>,
	stateMethods: SM,
) {
	let state = $state<State<SM>>(defaultState);

	const stateController = {
		get state() {
			return state;
		},
		set state(value: State<SM>) {
			state = value;
		},
	};

	return attachMethods(stateController, stateMethods);
}
```

</div>

## State Controller as a Class

<div class="code">

```ts
class StateController<SM extends StateMethods> {
	state = $state<State<SM>>();

	protected constructor(defaultState: State<SM>) {
		this.state = defaultState;
	}

	static create<SM extends StateMethods>(
		defaultState: State<SM>,
		stateMethods: SM,
	) {
		return attachMethods(
			new this(defaultState),
			stateMethods,
		);
	}
}

function stateController<SM extends StateMethods>(
	defaultState: State<SM>,
	stateMethods: SM,
) {
	return StateController.create(defaultState, stateMethods);
}
```

Since we can't properly extend the type in constructor. We have to make the constructor protected and use a static factory method to get instances of the correct type.

</div>

Let's also try to implement custom `ButtonController` class with baked-in state methods:

<div class="code">

```ts
class ButtonController {
	state = $state<keyof this['stateMethods']>('idle');
	stateMethods = {
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
	}

	protected constructor() {}

	static create() {
		const instance = new this();
		
		return attachMethods(instance, instance.stateMethods);
	}
}

const buttonController = ButtonController.create();
```

</div>

## Conclusion

The price of autocompletion is high 😅. While Typescript can sometimes lead you to seeking non-obvious solutions, the payoff is often worth it.

State controller approach can be particularly useful for UI components, that have multiple states and associated interactions. Defining these in a structured manner makes the code more maintainable and easier to reason about.

![]({selfFive})