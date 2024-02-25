import ValidationInput from '../inputs/validationInput.ts';
import messageDropdown from '../messageDropdown/index.ts';
import MessageForm from './messageForm.ts';
import scrapSvg from './svg/scrap.svg';
import sendSvg from './svg/send.svg';

export default new MessageForm({
  dropdown: messageDropdown,
  messageInput: new ValidationInput({
    name: 'message',
    text: 'Message',
    centeredInput: true,
    attr: { class: 'input-wrapper message-form__input' },
  }),

  scrapIcon: scrapSvg,
  sendIcon: sendSvg,
  attr: { class: 'message-form' },
});
