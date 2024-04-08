import tpl from './passwordForm.hbs?raw';
import ValidationForm from '../validationForm.ts';

import userController from '../../../controllers/user-controller.ts';

import { PropsType, ChildrenType } from '../../../core/types.ts';

export default class PasswordForm extends ValidationForm {
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

  private async submitHandler(event: SubmitEvent) {
    event.preventDefault();

    const formData = this.submitForm();

    if (formData && Object.keys(formData).length > 0) {
      const { oldPassword, newPassword } = formData;

      const status = await userController.changePassword({
        data: { oldPassword, newPassword },
      });

      if (status === 200) {
        (this.element! as HTMLFormElement).reset();
      }
    }
  }
}
