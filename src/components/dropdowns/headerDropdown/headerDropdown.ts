import tpl from './headerDropdown.hbs?raw';
import { PropsType, ChildrenType } from '../../../core/block.ts';
import Dropdown from '../dropdown.ts';
import Modal from '../../modals/userModal/userModal.ts';
import FormInput from '../../inputs/formInput.ts';
import Button from '../../button/button.ts';

export default class HeaderDropdown extends Dropdown {
  modalRoot: HTMLElement;

  constructor(props: PropsType | ChildrenType) {
    super(props);

    this.modalRoot = document.getElementById('modal')!;
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
    this.children.removeUserBtn.addEvent('click', (event: Event) =>
      this.removeUserHandler.bind(this, event)(),
    );
  }

  addUserHandler(event: Event) {
    event.stopPropagation();

    const addModal = this.createModal('Add');
    const addModalEl: HTMLElement = addModal.getContent();

    this.modalRoot.append(addModalEl);

    addModal.addEvent('click', (event: Event) =>
      this.closeModal.bind(this, event, addModalEl)(),
    );
  }

  removeUserHandler(event: Event) {
    event.stopPropagation();

    const removeModal = this.createModal('Remove');
    const removeModalEl: HTMLElement = removeModal.getContent();

    this.modalRoot.append(removeModalEl);

    removeModal.addEvent('click', (event: Event) =>
      this.closeModal.bind(this, event, removeModalEl)(),
    );
  }

  closeModal(event: Event, el: HTMLElement) {
    if ((event.target as HTMLElement).title !== 'Backdrop') return;
    el.remove();
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
      attr: { class: 'modal' },
      events: {},
    });
  }
}

