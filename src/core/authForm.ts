import Block, { PropsType, ChildrenType } from './block.ts';

export default class AuthForm extends Block {
  constructor(tagName: string, props: PropsType | ChildrenType) {
    super(tagName, props);

    this.addEvents();
  }

  addEvents() {
    this.element?.addEventListener('submit', (event) => this.submitForm(event));
  }

  submitForm(event: SubmitEvent) {
    event.preventDefault();
    const formIsValid = this.validateForm();

    if (!formIsValid) {
      /* eslint no-console: 0 */

      console.log('Wrong input values!');
      return;
    }

    const formObject: Record<string, string> = {};

    const inputs = this.element!.querySelectorAll('input');
    inputs.forEach((input) => {
      formObject[input.name] = input.value;
    });

    console.log(formObject);
  }

  validateForm(): boolean {
    let isValid: boolean = true;

    Object.values(this.children).forEach((child) => {
      if (child.element.querySelector('input')) {
        const inputIsValid = child.validateInput();
        if (!inputIsValid) isValid = inputIsValid;
      }
    });

    return isValid;
  }
}
