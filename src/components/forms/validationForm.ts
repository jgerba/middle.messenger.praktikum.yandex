import Block, { PropsType, ChildrenType } from '../../core/block.ts';
import ValidationInput from '../inputs/validationInput.ts';

export default class ValidationForm extends Block {
  constructor(tagName: string, props: PropsType | ChildrenType) {
    const onSubmit = (event: SubmitEvent) => this.submitForm(event);

    super(tagName, { ...props, events: { submit: onSubmit } });
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

    Object.values(this.children).forEach((child: Block) => {
      // remove none inputs & oldPass input
      if (
        child.element!.querySelector('input') &&
        !child.element!.querySelector('input[name="oldPassword"]') &&
        (child.props.attr as { [title: string]: string }).title !==
          'User picture'
      ) {
        if (child instanceof ValidationInput) {
          const inputIsValid = child.validateInput();
          if (!inputIsValid) isValid = false;
        }
      }
    });

    return isValid;
  }
}
