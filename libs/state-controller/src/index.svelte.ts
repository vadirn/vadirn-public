import { type AnyFn } from '@workspace/standard/function';
import type { Prettify, UnionToIntersection } from '../../standard/src/type';

type StateMethods = Record<string, Record<string, AnyFn>>;

type State<SM extends StateMethods> = keyof SM;

type Methods<SM extends StateMethods> =
	Prettify<UnionToIntersection<SM[keyof SM]>>;

export abstract class AbstractStateController<SM extends StateMethods> {
	private _state = $state<keyof SM>();
	protected constructor(defaultState: State<SM>, readonly stateMethods: SM) {
		this._state = defaultState;
	}

	get state() {
		return this._state;
	}

	set = (state: State<SM>) => {
		this._state = state;
	};

	protected attachMethods = () => {
		for (const stateKey of Object.keys(this.stateMethods)) {
			for (const methodKey of Object.keys(this.stateMethods[stateKey]!)) {
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
		return new StateController(defaultState, stateMethods).attachMethods();
	}
}

export function stateController<SM extends StateMethods>(
	defaultState: State<SM>,
	stateMethods: SM,
) {
	return StateController.create(defaultState, stateMethods);
}
