import { type AnyFn, type UnknownFn } from '@libs/standard/function';
import { merge } from '@libs/standard/object';
import type { UnionToIntersection } from '@libs/standard/type';

type StateMethods = Record<string, Record<string, AnyFn>>;

type State<SM extends StateMethods> = keyof SM | undefined;

type Methods<SM extends StateMethods> =
	UnionToIntersection<SM[keyof SM]>;

type Controller<SM extends StateMethods> = {
	state: State<SM>;
};

export class StateController<SM extends StateMethods> {
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

export function stateController<SM extends StateMethods>(
	defaultState: State<SM>,
	stateMethods: SM,
) {
	return StateController.create(defaultState, stateMethods);
}

export function attachMethods<
	SM extends StateMethods,
	SC extends Controller<SM>,
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
