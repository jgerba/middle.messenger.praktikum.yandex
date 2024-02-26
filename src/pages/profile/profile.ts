import tpl from './profile.hbs?raw';
import Block, { PropsType, ChildrenType } from '../../core/block.js';

export default class ProfilePage extends Block {
  btns: ChildrenType[];

  forms: HTMLElement[];

  constructor(props: PropsType | ChildrenType) {
    super('div', props);

    this.addEvents();
  }

  render(): DocumentFragment {
    // remove events data from props
    // iife - destructure props from argument, return rest (no unused vars)
    // const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, this.props);
  }

  addEvents() {
    this.initElems();

    // put listener inside btn's props.event & add event
    this.btns.forEach((btn) =>
      btn.addEvent('click', (event: MouseEvent) => this.changePage(event)),
    );
  }

  initElems() {
    this.btns = [
      this.children.profile.children.changeProfileBtn,
      this.children.profile.children.changePassBtn,
      this.children.profile.children.logOutBtn,
      this.children.returnBtn,
    ];

    this.forms = [
      this.children.profile.element,
      this.children.profileForm.element,
      this.children.passwordForm.element,
    ];
  }

  changePage(event: MouseEvent) {
    const clickBtn = event.currentTarget as HTMLElement;
    let { title } = clickBtn;

    if (title === 'Log out') {
      /* eslint no-console: 0 */

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
