import tpl from './textModal.hbs?raw';
import Modal from '../modal.js';
import ValidationInput from '../../inputs/validationInput.js';
import chatsController from '../../../controllers/chats-controller.js';

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

    if (isValid) {
      const titleVal = { title: input.element!.querySelector('input')!.value };
      chatsController.createChat({ data: titleVal });
    }
  }
}
