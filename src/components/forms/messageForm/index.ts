import ValidationInput from '../../inputs/validationInput.ts';
import messageDropdown from '../../dropdowns/messageDropdown/index.ts';
import MessageForm from './messageForm.ts';
import sendSvg from './svg/send.svg';
import { PropsType } from '../../../core/block.ts';
import connect from '../../../core/connect.ts';

type IndexedType = {
  [key: string]: string | number | IndexedType;
};

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
    centeredInput: true,
    attr: { class: 'input-wrapper message-form__input' },
  }),

  sendIcon: sendSvg,
  attr: { class: 'message-form' },
});

