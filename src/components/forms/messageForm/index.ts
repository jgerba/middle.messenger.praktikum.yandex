import MessageForm from './messageForm.ts';
import connect from '../../../core/connect.ts';

import ValidationInput from '../../inputs/validationInput.ts';
import messageDropdown from '../../dropdowns/messageDropdown/index.ts';
import sendSvg from './svg/send.svg';

import { PropsType, IndexedType } from '../../../core/types.ts';

function checkChat(state: IndexedType): PropsType {
  return {
    // eslint-disable-next-line no-unneeded-ternary
    isInChat: state.currentChat ? true : false,
  };
}

const ConnectedChatHead = connect(MessageForm, checkChat);

export default new ConnectedChatHead('form', {
  messageDropdown,
  messageInput: new ValidationInput('div', {
    name: 'message',
    text: 'Message',
    autocomplete: 'off',
    centeredInput: true,
    attr: { class: 'input-wrapper message-form__input' },
  }),

  sendIcon: sendSvg,
  attr: { class: 'message-form' },
});
