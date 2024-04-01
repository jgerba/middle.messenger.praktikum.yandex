import tpl from '../addUserModal/addModal.hbs?raw';
import Modal from '../modal.js';

import chatsController from '../../../controllers/chats-controller.js';
import ValidationInput from '../../inputs/validationInput.js';

export default class AddChatModal extends Modal {
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

    const status = await chatsController.createChat({ data: inputData });
    status === 200 ? this.closeModal() : this.handleError();
  }
}
