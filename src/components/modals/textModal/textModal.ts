import tpl from './textModal.hbs?raw';
import Modal from '../modal.js';
import ValidationInput from '../../inputs/validationInput.js';
import chatsController from '../../../controllers/chats-controller.js';
import userController from '../../../controllers/user-controller.js';
import store from '../../../core/store.js';

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

    const titleVal = { title: input.element!.querySelector('input')!.value };
    const modalTitle = this.props.modalHeader as string;

    console.log(modalTitle, titleVal);

    if (modalTitle.includes('Add user')) {
      this.userHandler(titleVal);
      return;
    }
    if (modalTitle.includes('Remove user')) {
      this.userHandler(titleVal, false);
      return;
    }

    const status = await chatsController.createChat({ data: titleVal });
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

    this.closeModal();
  }

  handleError() {
    console.log('Error handling...');
  }
}

