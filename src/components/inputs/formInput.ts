import ValidationInput from './validationInput.js';

import { PropsType } from '../../core/types.ts';

export default class FormInput extends ValidationInput {
  constructor(tagName: string, props: PropsType) {
    const onFocus = () => this.toggleLabel.bind(this)();

    super(tagName, {
      ...props,
      events: { focusin: onFocus, focusout: onFocus },
    });
  }

  private toggleLabel() {
    const labelEl = this.element!.querySelector('label') as HTMLLabelElement;

    labelEl.classList.toggle('label--small');
    labelEl.classList.toggle('label--hidden');
  }
}
