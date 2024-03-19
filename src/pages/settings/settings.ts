import tpl from './settings.hbs?raw';
import Block, { PropsType, ChildrenType } from '../../core/block.js';

// import router from '../../main.js';
import authController from '../../controllers/auth-controller.js';
import store from '../../core/store.js';

export default class Settings extends Block {
  btns: Block[];

  forms: HTMLElement[];

  constructor(props: PropsType | ChildrenType) {
    super('div', props);

    this.initElems();
    this.addEvents();
  }

  render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }

  addEvents() {
    // put listener inside btn's props.event & add event
    this.btns.forEach((btn) =>
      btn.addEvent('click', (event: MouseEvent) => this.changePage(event)),
    );
  }

  initElems() {
    this.btns = [
      (this.children.profile as Block).children.changeProfileBtn as Block,
      (this.children.profile as Block).children.changePassBtn as Block,
      (this.children.profile as Block).children.logOutBtn as Block,
      this.children.returnBtn as Block,
    ];

    this.forms = [
      (this.children.profile as Block).element!,
      (this.children.profileForm as Block).element!,
      (this.children.passwordForm as Block).element!,
    ];
  }

  changePage(event: MouseEvent) {
    const clickBtn = event.currentTarget as HTMLElement;
    let { title: btnTitle } = clickBtn;

    if (btnTitle === 'Log out') {
      this.logOutHandler();
      return;
    }
    if (btnTitle === 'Step back') {
      // case when already in settings root
      if (!this.forms[0].classList.contains('hidden')) {
        store.getRouter().go('/messenger');
        return;
      }

      btnTitle = 'Profile';
    }

    this.forms.forEach((form) => {
      if (form.title === btnTitle) {
        form.classList.remove('hidden');
        return;
      }

      form.classList.add('hidden');
    });
  }

  logOutHandler() {
    authController.logOut();
  }
}
