import tpl from './profile.hbs?raw';
import Block, { PropsType, ChildrenType } from '../../core/block.js';

export default class ProfilePage extends Block {
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
    const nameHeader = this.element!.querySelector('h1') as HTMLElement;

    if (btnTitle === 'Log out') {
      /* eslint no-console: 0 */

      console.log('Logging out...');
      return;
    }
    if (btnTitle === 'Step back') {
      // case when already in profile form
      if (!this.forms[0].classList.contains('hidden')) {
        console.log('Redirecting to chat page...');
        return;
      }

      btnTitle = 'Profile';
    }

    this.forms.forEach((form) => {
      btnTitle === 'Profile'
        ? nameHeader.classList.remove('hidden')
        : nameHeader.classList.add('hidden');

      if (form.title === btnTitle) {
        form.classList.remove('hidden');
        return;
      }

      form.classList.add('hidden');
    });
  }
}
