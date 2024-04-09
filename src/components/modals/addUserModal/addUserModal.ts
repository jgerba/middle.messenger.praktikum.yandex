import tpl from './addModal.hbs?raw';
import Modal from '../modal.js';
import store from '../../../core/store.js';

import chatsController from '../../../controllers/chats-controller.js';
import userController from '../../../controllers/user-controller.js';
import ValidationInput from '../../inputs/validationInput.js';

export default class AddUserModal extends Modal {
  protected render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }

  protected async submitHandler(event: SubmitEvent) {
    event.preventDefault();

    const input = this.children.textInput as ValidationInput;
    const isValid = input.validateInput();

    if (!isValid) {
      return;
    }

    const inputData = { title: input.element!.querySelector('input')!.value };

    this.userHandler(inputData);
  }

  private async userHandler(data: { [key: string]: string }) {
    const user = (await userController.searchUser({
      data: { login: data.title },
    })) as unknown;

    if (!user) {
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

    const status = await chatsController.addUsers(dataToSend);

    if (status === 200) {
      this.closeModal();
    }
  }
}
