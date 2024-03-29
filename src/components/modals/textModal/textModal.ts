import tpl from './textModal.hbs?raw';
import Modal from '../modal.js';

import chatsController from '../../../controllers/chats-controller.js';
import userController from '../../../controllers/user-controller.js';
import store from '../../../core/store.js';

import ValidationInput from '../../inputs/validationInput.js';

import { IndexedType } from '../../../core/types.js';

export default class textModal extends Modal {
  render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }

  async submitHandler(event: SubmitEvent) {
    event.preventDefault();

    const input = this.children.textInput as ValidationInput;
    const isValid = input.validateInput();

    if (!isValid) {
      return;
    }

    const inputData = { title: input.element!.querySelector('input')!.value };
    const modalTitle = this.props.modalHeader as string;

    console.log(modalTitle, inputData);

    if (modalTitle.includes('Add user')) {
      this.userHandler(inputData);
      return;
    }
    if (modalTitle.includes('Remove user')) {
      this.userHandler(inputData, false);
      return;
    }
    if (modalTitle.includes('Remove chat')) {
      this.chatRemoveHandler();
      return;
    }

    const status = await chatsController.createChat({ data: inputData });
    status === 200 ? this.closeModal() : this.handleError();
  }

  async userHandler(data: { [key: string]: string }, isAdd: boolean = true) {
    const user = (await userController.searchUser({
      data: { login: data.title },
    })) as unknown;

    if (!user) {
      this.handleError();
      return;
    }

    const state = store.getState();
    const chatId = (state.currentChat as { [key: string]: number }).id;
    const dataToSend = {
      data: {
        users: [(user as { [key: string]: number }[])[0].id],
        chatId,
      },
    };

    let status;

    isAdd
      ? (status = await chatsController.addUsers(dataToSend))
      : (status = await chatsController.removeUsers(dataToSend));

    status === 200 ? this.closeModal() : this.handleError();
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

  handleError() {
    console.log('Error handling...');
  }
}
