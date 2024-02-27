import { PropsType } from '../../core/block.js';
import Input from './input.ts';

export default class ValidationInput extends Input {
  constructor(props: PropsType) {
    const onBlur = () => this.validateInput.bind(this)();

    super({
      ...props,
      events: {
        ...(props.events as { [key: string]: () => void }),
        blur: onBlur,
      },
    });
  }

  validateInput(): boolean {
    const inputEl = this.element!.querySelector('input') as HTMLInputElement;

    let isValid;

    if (inputEl.name === 'message' && inputEl.value.trim()) {
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

    console.log(passInputs);

    return (
      (passInputs![1] as HTMLInputElement).value ===
      (passInputs![2] as HTMLInputElement).value
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
