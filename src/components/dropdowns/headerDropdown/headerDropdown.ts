import tpl from './headerDropdown.hbs?raw';
import { PropsType, ChildrenType } from '../../../core/block.ts';
import Dropdown from '../dropdown.ts';
import userModal from '../../modals/userModal/index.ts';

export default class HeaderDropdown extends Dropdown {
  constructor(props: PropsType | ChildrenType) {
    super(props);

    this.initOpenDropBtn();
    this.initOptions();
  }

  render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }

  initOptions() {
    this.children.addUserBtn.addEvent('click', (event: Event) =>
      this.addUserHandler.bind(this, event)(),
    );
  }

  addUserHandler(event: Event) {
    event.stopPropagation();
    const rootEl = document.getElementById('app') as HTMLElement;

    rootEl.append(userModal.getContent() as HTMLElement);

    userModal.addEvent('click', (event: Event) =>
      this.closeModal.bind(this, event)(),
    );
  }

  closeModal(event: Event) {
    if ((event.target as HTMLElement).title !== 'Backdrop') return;
    userModal._removeEvents();
    userModal.getContent()?.remove();
  }
}
