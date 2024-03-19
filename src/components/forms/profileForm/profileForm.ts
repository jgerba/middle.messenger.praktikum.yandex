import tpl from './profileForm.hbs?raw';
import { PropsType, ChildrenType } from '../../../core/block.ts';
import ValidationForm from '../validationForm.ts';
import userController from '../../../controllers/user-controller.ts';

export default class ProfileForm extends ValidationForm {
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
      userController.changeUser({ data: formData });
    }
  }
}
