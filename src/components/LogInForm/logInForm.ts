import tpl from './logInForm.hbs?raw';
import Block, { PropsType, ChildrenType } from '../../core/block.ts';

export default class LogInForm extends Block {
    constructor(props: PropsType | ChildrenType) {
        super('form', props);

        this.addEvents();
    }

    render(): DocumentFragment {
        // remove events data from props
        const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

        return this.compile(tpl, propsToRender);
    }

    addEvents() {
        this.element?.addEventListener('submit', event =>
            this.submitForm(event)
        );
    }

    submitForm(event: SubmitEvent) {
        event.preventDefault();
        const formIsValid = this.validateForm();

        if (!formIsValid) {
            console.log('Wrong input values!');
            return;
        }

        const formObject: Record<string, string> = {};

        const inputs = this.element!.querySelectorAll('input');
        inputs.forEach(input => {
            formObject[input.name] = input.value;
        });

        console.log(formObject);
    }

    validateForm(): boolean {
        let isValid: boolean = true;

        Object.values(this.children).forEach(child => {
            if (child.element.querySelector('input')) {
                const inputIsValid = child.validateInput();
                if (!inputIsValid) isValid = inputIsValid;
            }
        });

        return isValid;
    }
}

