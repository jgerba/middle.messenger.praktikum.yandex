import tpl from './profile.hbs?raw';
import Block, { PropsType, ChildrenType } from '../../core/block.js';

export default class ProfilePage extends Block {
  btns: HTMLElement[];

  forms: HTMLElement[];

  constructor(props: PropsType | ChildrenType) {
    super('main', props);

    this.addEvents();
  }

  render(): DocumentFragment {
    // remove events data from props
    const propsToRender = (({ attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }

  addEvents() {
    this.initElems();

    this.btns.forEach((item) => item.addEventListener('click', (event) => this.changePage(event)));
  }

  initElems() {
    this.btns = [
            this.element!.querySelector('button[title="Change profile"]')!,
            this.element!.querySelector('button[title="Change password"]')!,
            this.element!.querySelector('button[title="Log out"]')!,
            this.element!.querySelector('button[title="Step back"]')!,
    ];

    this.forms = [
      this.children.profile.element,
      this.children.profileForm.element,
      this.children.passwordForm.element,
    ];
  }

  changePage(event: Event) {
    const clickBtn = event.currentTarget as HTMLElement;
    let { title } = clickBtn;

    if (title === 'Log out') {
      console.log('Logging out...');
      return;
    }
    if (title === 'Step back') {
      // case when already in profile form
      if (!this.forms[0].classList.contains('hidden')) {
        console.log('Redirecting to chat page...');
        return;
      }

      title = 'Profile';
    }

    this.forms.forEach((form) => {
      if (form.title === title) {
        form.classList.remove('hidden');
        return;
      }

      form.classList.add('hidden');
    });
  }
}
