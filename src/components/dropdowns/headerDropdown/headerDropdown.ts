import tpl from './headerDropdown.hbs?raw';
import Block, { PropsType, ChildrenType } from '../../../core/block.ts';

import Dropdown from '../dropdown.ts';
import Modal from '../../modals/textModal/textModal.ts';
import FormInput from '../../inputs/formInput.ts';
import Button from '../../button/button.ts';

export default class HeaderDropdown extends Dropdown {
  constructor(props: PropsType | ChildrenType) {
    super(props);

    this.initOptions();
  }

  render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }

  initOptions() {
    (this.children.addUserBtn as Block).addEvent('click', (event: Event) =>
      this.addUserHandler.bind(this, event)(),
    );
    (this.children.removeUserBtn as Block).addEvent('click', (event: Event) =>
      this.removeUserHandler.bind(this, event)(),
    );
  }

  addUserHandler(e: Event) {
    e.stopPropagation();
    this.createModal('Add');
  }

  removeUserHandler(e: Event) {
    e.stopPropagation();
    this.createModal('Remove');
  }

  createModal(type: string) {
    /* eslint no-new: 0 */

    new Modal({
      textInput: new FormInput({
        name: 'login',
        text: 'Login',
        attr: { class: 'input-wrapper ' },
      }),
      submitBtn: new Button({
        text: type,
        attr: { class: 'btn', type: 'submit' },
      }),

      modalHeader: `${type} user`,
      attr: { class: 'modal' },
      events: {},
    });
  }
}
