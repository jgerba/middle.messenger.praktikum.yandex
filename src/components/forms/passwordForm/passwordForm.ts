import tpl from './passwordForm.hbs?raw';
import ValidationForm from '../validationForm.ts';

import userController from '../../../controllers/user-controller.ts';

import { PropsType, ChildrenType } from '../../../core/types.ts';

export default class PasswordForm extends ValidationForm {
  constructor(props: PropsType | ChildrenType) {
    const onSubmit = (event: SubmitEvent) => this.submitHandler(event);

    super('form', { ...props, events: { submit: onSubmit } });
  }

  render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }

  submitHandler(event: SubmitEvent): void {
    event.preventDefault();

    const formData = this.submitForm();
    console.log(formData);

    if (formData && Object.keys(formData).length > 0) {
      const { oldPassword, newPassword } = formData;
      userController.changePassword({ data: { oldPassword, newPassword } });
    }
  }
}
