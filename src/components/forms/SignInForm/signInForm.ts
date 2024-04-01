import tpl from './signInForm.hbs?raw';
import Block from '../../../core/block.ts';
import ValidationForm from '../validationForm.ts';

import authController from '../../../controllers/auth-controller.ts';
import store from '../../../core/store.ts';

import { PropsType, ChildrenType } from '../../../core/types.ts';

export default class SignInForm extends ValidationForm {
  constructor(props: PropsType | ChildrenType) {
    const onSubmit = (event: SubmitEvent) => this.submitHandler(event);

    super('form', { ...props, events: { submit: onSubmit } });

    this.initSignUpBtn();
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

    if (formData && Object.keys(formData).length === 2) {
      authController.logIn({ data: formData });
    }
  }

  initSignUpBtn() {
    const signUpBtn = this.children.signUpBtn as Block;

    // put listener inside btn props.event & add event
    signUpBtn.addEvent('click', this.changeFormHandler.bind(this));
  }

  changeFormHandler() {
    store.getRouter().go('/sign-up');
  }
}
