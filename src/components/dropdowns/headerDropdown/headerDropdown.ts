import tpl from './headerDropdown.hbs?raw';
import Block from '../../../core/block.ts';

import Dropdown from '../dropdown.ts';
import RemoveUserModal from '../../modals/removeUserModal/removeUserModal.ts';
import AddUserModal from '../../modals/addUserModal/addUserModal.ts';
import RemoveChatModal from '../../modals/removeChatModal/removeChatModal.ts';
import FormInput from '../../inputs/formInput.ts';
import Button from '../../button/button.ts';

import { PropsType, ChildrenType } from '../../../core/types.ts';

/* eslint no-new: 0 */

export default class HeaderDropdown extends Dropdown {
  constructor(props: PropsType | ChildrenType) {
    super(props);

    this.initOptions();
  }

  protected render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }

  private initOptions() {
    (this.children.addUserBtn as Block).addEvent(
      'click',
      this.createAddUserModal,
    );
    (this.children.removeUserBtn as Block).addEvent(
      'click',
      this.createRemoveUserModal,
    );
    (this.children.removeChatBtn as Block).addEvent(
      'click',
      this.createRemoveChatModal,
    );
  }

  private createAddUserModal() {
    new AddUserModal({
      textInput: new FormInput('div', {
        name: 'login',
        text: 'Login',
        attr: { class: 'input-wrapper ' },
      }),
      submitBtn: new Button('button', {
        text: 'Add',
        attr: { class: 'btn', type: 'submit' },
      }),

      modalHeader: 'Add user',
      attr: { class: 'modal' },
      events: {},
    });
  }

  private createRemoveUserModal() {
    new RemoveUserModal({
      modalHeader: 'Remove user',
      attr: { class: 'modal' },
      events: {},
    });
  }

  private createRemoveChatModal() {
    new RemoveChatModal({
      submitBtn: new Button('button', {
        text: 'Remove',
        attr: { class: 'btn', type: 'submit' },
      }),

      modalHeader: 'Remove chat',
      attr: { class: 'modal' },
      events: {},
    });
  }
}
