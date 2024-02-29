import ValidationInput from '../inputs/validationInput.ts';
import messageDropdown from '../messageDropdown/index.ts';
import MessageForm from './messageForm.ts';
import sendSvg from './svg/send.svg';

export default new MessageForm({
  messageDropdown,
  messageInput: new ValidationInput({
    name: 'message',
    text: 'Message',
    centeredInput: true,
    attr: { class: 'input-wrapper message-form__input' },
  }),

  sendIcon: sendSvg,
  attr: { class: 'message-form' },
});
