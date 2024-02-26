import { PropsType } from '../../core/block.js';
import ValidationInput from './validationInput.js';

export default class FormInput extends ValidationInput {
  constructor(props: PropsType) {
    const onFocus = () => this.toggleLabel.bind(this)();

    super({
      ...props,
      events: { focusin: onFocus, focusout: onFocus },
    });
  }

  toggleLabel() {
    const labelEl = this.element!.querySelector('label') as HTMLLabelElement;

    labelEl.classList.toggle('label--small');
    labelEl.classList.toggle('label--hidden');
  }
}
