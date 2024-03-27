import tpl from './headerDropdown.hbs?raw';
import Block from '../../../core/block.ts';

import Dropdown from '../dropdown.ts';
import Modal from '../../modals/textModal/textModal.ts';
import FormInput from '../../inputs/formInput.ts';
import Button from '../../button/button.ts';

import { PropsType, ChildrenType } from '../../../core/types.ts';

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
    (this.children.addUserBtn as Block).addEvent('click', () =>
      this.addUserHandler.bind(this)(),
    );
    (this.children.removeUserBtn as Block).addEvent('click', () =>
      this.removeUserHandler.bind(this)(),
    );
    (this.children.removeChatBtn as Block).addEvent('click', () =>
      this.removeChatHandler.bind(this)(),
    );
  }

  addUserHandler() {
    this.createModal('Add');
  }

  removeUserHandler() {
    this.createModal('Remove');
  }

  removeChatHandler() {
    this.createModal('Remove chat');
  }

  createModal(type: string) {
    /* eslint no-new: 0 */

    new Modal({
      textInput: new FormInput('div', {
        name: type === 'Remove chat' ? 'chatId' : 'login',
        text: type === 'Remove chat' ? 'Chat ID' : 'Login',
        attr: { class: type === 'Remove chat' ? 'hidden' : 'input-wrapper ' },
      }),
      submitBtn: new Button('button', {
        text: type === 'Add' ? type : 'Remove',
        attr: { class: 'btn', type: 'submit' },
      }),

      modalHeader: type === 'Remove chat' ? type : `${type} user`,
      attr: { class: 'modal' },
      events: {},
    });
  }
}
