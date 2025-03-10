import { type AnyFn, type UnknownFn } from '@libs/standard/function';
import { merge } from '@libs/standard/object';
import type { UnionToIntersection } from '@libs/standard/type';

type StateMethods = Record<string, Record<string, AnyFn>>;

type State<TStateMethods extends StateMethods> =
	keyof TStateMethods | undefined;

type Methods<TStateMethods extends StateMethods> =
	UnionToIntersection<TStateMethods[keyof TStateMethods]>;

type Controller<TStateMethods extends StateMethods> = {
	state: State<TStateMethods>;
};

export class StateController<TSM extends StateMethods> {
	state = $state<State<TSM>>();

	protected constructor(defaultState: State<TSM>) {
		this.state = defaultState;
	}

	static create<TStateMethods extends StateMethods>(
		defaultState: State<TStateMethods>,
		stateMethods: TStateMethods,
	) {
		return attachMethods(
			new this(defaultState),
			stateMethods,
		);
	}
}

export function stateController<TStateMethods extends StateMethods>(
	defaultState: State<TStateMethods>,
	stateMethods: TStateMethods,
) {
	return StateController.create(defaultState, stateMethods);
}

export function attachMethods<
	TStateMethods extends StateMethods,
	TController extends Controller<TStateMethods>,
>(
	controller: TController,
	stateMethods: TStateMethods,
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
		methods as Methods<TStateMethods>,
	);
}
