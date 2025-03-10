import { PersistedState } from '@libs/runes/persisted-state';
import { attachMethods } from '@libs/state-controller';
import { tick } from 'svelte';
import { preventDefault } from '@libs/standard/dom';
import type { ContactFormData } from '@domain/all/contact-form';

export const FormStates = {
	Idle: 'idle',
	Submitting: 'submitting',
	Success: 'success',
	Error: 'error',
} as const;

type FormState = typeof FormStates[keyof typeof FormStates];

export class FormController {
	state: FormState = $state(FormStates.Idle);
	message = $state('');
	fields = {
		plan: new PersistedState('contact-form-plan'),
		name: new PersistedState('contact-form-name'),
		email: new PersistedState('contact-form-email'),
		company: new PersistedState('contact-form-company'),
		message: new PersistedState('contact-form-message'),
	} satisfies Record<keyof ContactFormData, PersistedState>;

	protected constructor() {}

	resetFields = () => {
		for (const field of Object.values(this.fields)) {
			field.value = '';
		}
	};

	resetMessage = () => {
		this.message = '';
	};

	static create() {
		const instance = new this();

		return attachMethods(instance, {
			[FormStates.Idle]: {
				startSubmitting:
					() => idleStartSubmitting(instance),
				handleReset:
					(setModalScroll: (scroll: number) => void) => idleHandleReset(
						setModalScroll,
						instance,
					),
				submit:
					(event: Event) => idleSubmit(event, instance),
			},
			[FormStates.Submitting]: {
				success:
					() => submittingSuccess(instance),
				error:
					() => submittingError(instance),
				// prevent click on reset button instead of trying to preventDefault the form
				reset:
					preventDefault,
				submit:
					preventDefault,
			},
			get [FormStates.Success]() {
				return {
					startSubmitting:
						this[FormStates.Idle].startSubmitting,
					reset:
						async (event: Event) => successReset(event, instance),
					submit:
						(event: Event, closeModal: () => void) => successSubmit(
							event,
							instance,
							closeModal,
						),
				};
			},
			get [FormStates.Error]() {
				return {
					startSubmitting: this[FormStates.Idle].startSubmitting,
					reset: this[FormStates.Success].reset,
				};
			},
		});
	}
}

export type FormControllerInstance = ReturnType<typeof FormController.create>;

function idleStartSubmitting(instance: FormController) {
	instance.state = FormStates.Submitting;
	instance.resetMessage();
}

async function idleHandleReset(
	setModalScroll: (scroll: number) => void,
	instance: FormController,
) {
	setModalScroll(0);
	instance.resetMessage();
	// some browsers (Safari) change focus on reset
	// ensure disabled elements are released first
	await tick();
	(document.activeElement as HTMLElement)?.blur();
}

function idleSubmit(event: Event, instance: FormController) {
	const formElement = (event.target as HTMLElement).closest('form');

	if (!formElement.checkValidity()) {
		instance.message = 'Please fix the errors above';
		instance.state = FormStates.Error;
	}
}

function submittingSuccess(instance: FormController) {
	instance.state = FormStates.Success;
}

function submittingError(instance: FormController) {
	instance.state = FormStates.Error;
}

function successReset(event: Event, instance: FormController) {
	event.preventDefault();
	instance.state = FormStates.Idle;
	instance.resetMessage();
	(event.target as HTMLElement).closest('form')?.reset();
}

function successSubmit(
	event: Event,
	instance: FormController,
	closeModal: () => void,
) {
	event.preventDefault();
	// clean up fields when done
	instance.resetFields();
	instance.resetMessage();
	closeModal();
}
