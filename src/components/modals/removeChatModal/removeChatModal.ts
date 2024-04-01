import tpl from './removeChatModal.hbs?raw';
import Modal from '../modal.js';

import chatsController from '../../../controllers/chats-controller.js';
import store from '../../../core/store.js';

import { IndexedType } from '../../../core/types.js';

export default class RemoveChatModal extends Modal {
  render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }

  async submitHandler(event: SubmitEvent) {
    event.preventDefault();

    this.chatRemoveHandler();
  }

  async chatRemoveHandler() {
    const state = store.getState();
    const currentId = (state.currentChat as IndexedType).id as number;

    const status = await chatsController.removeChat({
      data: { chatId: currentId },
    });

    if (status === 200) {
      // clear chat rendered messages
      store.clearStatePath('currentChat');
      this.closeModal();
      return;
    }
    this.handleError();
  }
}
