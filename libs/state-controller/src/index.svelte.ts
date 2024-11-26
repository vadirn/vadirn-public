import { type AnyFn } from '@workspace/standard/function';
import type { Prettify, UnionToIntersection } from '../../standard/src/type';

type StateMethods = Record<string, Record<string, AnyFn>>;

type State<SM extends StateMethods> = keyof SM;

type Methods<SM extends StateMethods> =
	Prettify<UnionToIntersection<SM[keyof SM]>>;

export abstract class AbstractStateController<SM extends StateMethods> {
	state = $state<keyof SM>();

	protected constructor(defaultState: State<SM>, readonly stateMethods: SM) {
		this.state = defaultState;
	}

	protected attachMethods = () => {
		for (const stateKey of Object.keys(this.stateMethods)) {
			for (const methodKey of Object.keys(this.stateMethods[stateKey]!)) {
				if (methodKey in this) continue; // skip if already exists

				// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export function stateControllerObject<SM extends StateMethods>(
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

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(stateController as any)[methodKey] = (...args: any[]) => {
				const availableMethods = stateMethods[state];

				return availableMethods?.[methodKey]?.(...args);
			};
		}
	}

	return stateController as typeof stateController & Methods<SM>;
}
