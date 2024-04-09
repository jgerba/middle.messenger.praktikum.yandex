import Input from './input.ts';

import { PropsType } from '../../core/types.ts';

export default class ValidationInput extends Input {
  constructor(tagName: string, props: PropsType) {
    const onBlur = () => this.validateInput.bind(this)();

    super(tagName, {
      ...props,
      events: {
        ...(props.events as { [key: string]: () => void }),
        blur: onBlur,
      },
    });
  }

  public validateInput(): boolean {
    const inputEl = this.element!.querySelector('input') as HTMLInputElement;
    let isValid;

    // if no pattern check empty string
    const regExpPattern = (this.props.regExpString as string)
      ? (this.props.regExpString as string)
      : '^.+$';
    const regExp = new RegExp(regExpPattern);

    isValid = regExp.test(inputEl.value);

    // compare pass & confirmPass (signup, change passes forms)
    let passesAreEqual: boolean = true;

    if (
      (isValid && inputEl.name === 'newPassword') ||
      (isValid && inputEl.name === 'password-confirm')
    ) {
      passesAreEqual = this.handlePassConfirm();
      if (isValid && !passesAreEqual) isValid = false;

      return isValid;
    }

    isValid ? this.hideError() : this.showError();

    return isValid;
  }

  // check if 2 passes available and compare them
  private handlePassConfirm(): boolean {
    const {
      newPass, newErorrEl, confirmPass, confirmErorrEl,
    } =
      this.getPassElements();

    const isEqual = newPass.value === confirmPass.value;

    if (isEqual) {
      this.hideError(newErorrEl);
      this.hideError(confirmErorrEl);
    } else {
      this.showError(newErorrEl);
      this.showError(confirmErorrEl);
    }

    return isEqual;
  }

  private getPassElements(): {
    newPass: HTMLInputElement;
    newErorrEl: HTMLParagraphElement;
    confirmPass: HTMLInputElement;
    confirmErorrEl: HTMLParagraphElement;
    } {
    const formEl = this.element?.closest('form') as HTMLFormElement;

    const newPass = formEl.querySelector('#newPassword-id') as HTMLInputElement;
    const newErorrEl = newPass
      .closest('div')!
      .querySelector('p') as HTMLParagraphElement;

    const confirmPass = formEl.querySelector(
      '#password-confirm-id',
    ) as HTMLInputElement;
    const confirmErorrEl = confirmPass
      .closest('div')!
      .querySelector('p') as HTMLParagraphElement;

    return {
      newPass,
      newErorrEl,
      confirmPass,
      confirmErorrEl,
    };
  }

  // show/hide error message
  private showError(el: HTMLParagraphElement | null = null) {
    let errorEl;
    let errorMsg;

    if (el) {
      errorEl = el;
      errorMsg = 'Passwords are not equal!';
    } else {
      errorEl = this.element!.querySelector('.error') as HTMLElement;
      errorMsg = `Wrong ${(this.props.text as string).toLowerCase()}`;
    }

    errorEl.classList.remove('hidden');
    errorEl.innerText = errorMsg;
  }

  private hideError(el: HTMLParagraphElement | null = null) {
    let errorEl;
    el
      ? (errorEl = el)
      : (errorEl = this.element!.querySelector('.error') as HTMLElement);

    errorEl.classList.add('hidden');
    errorEl.innerText = '';
  }
}
