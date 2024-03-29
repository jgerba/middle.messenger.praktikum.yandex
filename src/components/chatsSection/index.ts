import ChatsSection from './chatsSection.ts';

import Button from '../button/button.ts';
import searchForm from '../forms/searchForm/index.ts';

export default new ChatsSection('section', {
  searchForm,
  createChatBtn: new Button({
    text: 'New chat',
    attr: { class: 'btn', type: 'button' },
    events: {},
  }),
  attr: { class: 'chats-section' },
});
