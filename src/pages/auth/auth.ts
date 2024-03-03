import tpl from './auth.hbs?raw';
import Block, { PropsType, ChildrenType } from '../../core/block.js';

export default class AuthPage extends Block {
  constructor(props: PropsType | ChildrenType) {
    super('div', props);

    this.initChangeFormBtns();
  }

  render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }

  initChangeFormBtns() {
    // get btns inside children forms
    const createUserBtn = (this.children.logInForm as Block).children
      .createUserBtn as Block;
    const loginBtn = (this.children.createUserForm as Block).children
      .logInBtn as Block;

    // put listener inside btn's props.event & add event
    [createUserBtn, loginBtn].forEach((btn) => {
      btn.addEvent('click', this.changeForm.bind(this));
    });
  }

  changeForm() {
    const forms = this.element!.querySelectorAll('form');
    forms.forEach((form) => form.classList.toggle('hidden'));
  }
}
