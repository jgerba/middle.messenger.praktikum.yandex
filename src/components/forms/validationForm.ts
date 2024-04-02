import Block from '../../core/block.ts';
import ValidationInput from '../inputs/validationInput.ts';

export default class ValidationForm extends Block {
  protected submitForm() {
    const formIsValid = this.validateForm();

    if (!formIsValid) {
      console.log('Wrong input values!');
      return null;
    }

    const formObject: Record<string, string> = {};

    const inputs = this.element!.querySelectorAll('input');
    inputs.forEach((input) => {
      formObject[input.name] = input.value;
    });

    return formObject;
  }

  protected validateForm(): boolean {
    let isValid: boolean = true;

    Object.values(this.children).forEach((child: Block) => {
      // remove none inputs & oldPass input

      if (child instanceof ValidationInput) {
        const inputIsValid = child.validateInput();
        if (!inputIsValid) isValid = false;
      }
    });

    return isValid;
  }
}
