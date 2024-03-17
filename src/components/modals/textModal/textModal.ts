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

  submitHandler(event: SubmitEvent): void {
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

    chatsController.createChat({ data: titleVal });
  }

  async userHandler(data: { [key: string]: string }, isAdd: boolean = true) {
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

    if (isAdd) {
      chatsController.addUsers(dataToSend);
      return;
    }

    chatsController.removeUsers(dataToSend);
  }
}
