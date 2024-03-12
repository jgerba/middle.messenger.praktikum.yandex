import tpl from './signUpForm.hbs?raw';
import Block, { PropsType, ChildrenType } from '../../../core/block.ts';
import ValidationForm from '../validationForm.ts';

import router from '../../../main.ts';
import authController from '../../../controllers/auth-controller.ts';

export default class SignUpForm extends ValidationForm {
  constructor(props: PropsType | ChildrenType) {
    const onSubmit = (event: SubmitEvent) => this.submitHandler(event);

    super('form', {
      ...props,
      events: { submit: onSubmit },
    });

    this.initLogInBtn();
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

    if (formData) {
      authController.createUser({ data: formData });
    }
  }

  initLogInBtn() {
    const logInBtn = this.children.logInBtn as Block;

    // put listener inside btn props.event & add event
    logInBtn.addEvent('click', this.changeFormHandler.bind(this));
  }

  changeFormHandler() {
    router.go('/');
  }
}
