import tpl from './settings.hbs?raw';
import Block from '../../core/block.js';

import { PropsType, ChildrenType } from '../../core/types.ts';

// import router from '../../main.js';
import authController from '../../controllers/auth-controller.js';
import store from '../../core/store.js';

export default class Settings extends Block {
  private _btns: Block[];

  private _forms: HTMLElement[];

  constructor(props: PropsType | ChildrenType) {
    super('div', props);

    this.initElems();
    this.addEvents();
  }

  protected render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }

  private addEvents() {
    // put listener inside btn's props.event & add event
    this._btns.forEach((btn) =>
      btn.addEvent('click', (event: MouseEvent) => this.changePage(event)),
    );
  }

  private initElems() {
    this._btns = [
      (this.children.profile as Block).children.changeProfileBtn as Block,
      (this.children.profile as Block).children.changePassBtn as Block,
      (this.children.profile as Block).children.logOutBtn as Block,
      this.children.returnBtn as Block,
    ];

    this._forms = [
      (this.children.profile as Block).element!,
      (this.children.profileForm as Block).element!,
      (this.children.passwordForm as Block).element!,
    ];
  }

  private changePage(event: MouseEvent) {
    const clickBtn = event.currentTarget as HTMLElement;
    let { title: btnTitle } = clickBtn;

    if (btnTitle === 'Log out') {
      this.logOutHandler();
      return;
    }
    if (btnTitle === 'Step back') {
      // case when already in settings root
      if (!this._forms[0].classList.contains('hidden')) {
        store.getRouter().go('/messenger');
        return;
      }

      btnTitle = 'Profile';
    }

    this._forms.forEach((form) => {
      if (form.title === btnTitle) {
        form.classList.remove('hidden');
        return;
      }

      form.classList.add('hidden');
    });
  }

  private logOutHandler() {
    authController.logOut();
  }
}
