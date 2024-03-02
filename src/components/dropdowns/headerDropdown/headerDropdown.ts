import tpl from './headerDropdown.hbs?raw';
import { PropsType, ChildrenType } from '../../../core/block.ts';
import Dropdown from '../dropdown.ts';
import Modal from '../../modals/userModal/userModal.ts';
import FormInput from '../../inputs/formInput';
import Button from '../../button/button';

export default class HeaderDropdown extends Dropdown {
  addModal: ChildrenType;

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
    this.addModal = this.createModal('Add');

    rootEl.append(this.addModal.getContent() as HTMLElement);
    this.addModal.show();

    this.addModal.addEvent('click', (event: Event) =>
      this.closeModal.bind(this, event)(),
    );
  }

  closeModal(event: Event) {
    if ((event.target as HTMLElement).title !== 'Backdrop') return;
    this.addModal.removeEvent('click');
    this.addModal.hide();
  }

  createModal(type: string): ChildrenType {
    return new Modal({
      userInput: new FormInput({
        name: 'login',
        text: 'Login',
        attr: { class: 'input-wrapper ' },
      }),
      addBtn: new Button({
        text: type,
        attr: { class: 'btn', type: 'submit' },
      }),

      modalType: type,
      attr: { class: 'modal hidden' },
      events: {},
    });
  }
}
