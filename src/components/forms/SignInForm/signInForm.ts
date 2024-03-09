import tpl from './signInForm.hbs?raw';
import Block, { PropsType, ChildrenType } from '../../../core/block.ts';
import ValidationForm from '../validationForm.ts';
import router from '../../../main.ts';

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

    router.go('/messenger');
  }

  initSignUpBtn() {
    const signUpBtn = this.children.signUpBtn as Block;

    // put listener inside btn props.event & add event
    signUpBtn.addEvent('click', this.changeFormHandler.bind(this));
  }

  changeFormHandler() {
    router.go('/sign-up');
  }
}
