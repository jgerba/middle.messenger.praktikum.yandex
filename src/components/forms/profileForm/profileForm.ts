import tpl from './profileForm.hbs?raw';
import ValidationForm from '../validationForm.ts';
import userController from '../../../controllers/user-controller.ts';

import { PropsType, ChildrenType } from '../../../core/types.ts';

export default class ProfileForm extends ValidationForm {
  constructor(props: PropsType | ChildrenType) {
    const onSubmit = (event: SubmitEvent) => this.submitHandler(event);

    super('form', { ...props, events: { submit: onSubmit } });
  }

  protected render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }

  private submitHandler(event: SubmitEvent): void {
    event.preventDefault();

    const formData = this.submitForm();
    console.log(formData);

    if (formData && Object.keys(formData).length > 0) {
      userController.changeUser({ data: formData });
    }
  }
}
