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
      'input',
    ) as HTMLInputElement;

    // listeners to toggle label visibility in login forms
    // removed from send message input
    if (inputEl.name !== 'message') {
      inputEl?.addEventListener('focusin', () => this.toggleLabel.bind(this));
      inputEl?.addEventListener('focusout', () => this.toggleLabel.bind(this));
    }

    if (this.props.regExpString) {
      inputEl?.addEventListener('blur', () => this.validateInput());
    }
  }

  toggleLabel() {
    const labelEl = this.element!.querySelector(
      'label',
    ) as HTMLLabelElement;

    labelEl.classList.toggle('label--small');
    labelEl.classList.toggle('label--hidden');
  }

  validateInput(): boolean {
    const inputEl = this.element!.querySelector(
      'input',
    ) as HTMLInputElement;

    let isValid;

    // old pass enter in profile settings | message send
    if (
      inputEl.name === 'oldPassword'
            || (inputEl.name === 'message' && inputEl.value.trim())
    ) {
      isValid = true;
      return isValid;
    }

    if (inputEl.name === 'message' && !inputEl.value.trim()) {
      isValid = false;
      this.handleError(isValid);
      return isValid;
    }

    const regExp = new RegExp(this.props.regExpString as string);
    isValid = regExp.test(inputEl.value);
    let passesAreEqual: boolean = true;

    if (inputEl.type === 'password') {
      passesAreEqual = this.confirmPasswords();
      if (isValid && !passesAreEqual) isValid = false;
    }
    this.handleError(isValid, passesAreEqual);

    return isValid;
  }

  confirmPasswords(): boolean {
    const formEl = this.element?.closest('form');

    const passInputs = formEl?.querySelectorAll(
      'input[type=password]',
    ) as NodeList;

    if (passInputs.length < 2) return true;

    return (
      (passInputs![0] as HTMLInputElement).value
            === (passInputs![1] as HTMLInputElement).value
    );
  }

  handleError(isValid: boolean, passesAreEqual: boolean = true) {
    const errorEl = this.element!.querySelector('.error') as HTMLElement;

    if (isValid) {
      errorEl.classList.add('hidden');
      return;
    }

    errorEl.classList.remove('hidden');
    let errorMessage = `Wrong ${(this.props.text as string).toLowerCase()}`;

    if (!passesAreEqual) {
      errorMessage = 'Passwords are not equal!';
    }
    errorEl.innerText = errorMessage;
  }
}
