import tpl from './input.hbs?raw';
import Block, { PropsType } from '../../core/block.js';

export default class Input extends Block {
    constructor(props: PropsType) {
        super('div', props);

        this.addEvents();
    }

    render(): DocumentFragment {
        // remove events data from props
        const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

        return this.compile(tpl, propsToRender);
    }

    addEvents() {
        const inputEl = this.element!.querySelector(
            'input'
        ) as HTMLInputElement;

        inputEl?.addEventListener('focusin', () => this.toggleLabel.bind(this));
        inputEl?.addEventListener('focusout', () =>
            this.toggleLabel.bind(this)
        );

        if (this.props.regExpString) {
            inputEl?.addEventListener('blur', () => {
                const isValid = this.validateInput();
                this.addAttribute(isValid);
            });
        }
    }

    toggleLabel() {
        const labelEl = this.element!.querySelector(
            'label'
        ) as HTMLLabelElement;

        labelEl.classList.toggle('label--small');
        labelEl.classList.toggle('label--hidden');
    }

    validateInput(): boolean {
        const inputEl = this.element!.querySelector(
            'input'
        ) as HTMLInputElement;

        const regExp = new RegExp(this.props.regExpString as string);
        const isValid = regExp.test(inputEl.value);

        const errorEl = this.element!.querySelector('.error') as HTMLElement;
        if (isValid) {
            errorEl.classList.add('hidden');
        } else {
            errorEl.classList.remove('hidden');
            errorEl.innerText = `Wrong ${this.props.name}`;
        }

        return isValid;
    }

    addAttribute(isValid: boolean) {
        this.element!.setAttribute('isValid', isValid.toString());
    }
}
