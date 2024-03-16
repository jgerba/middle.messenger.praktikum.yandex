import ChatsSection from './chatsSection.ts';

import Button from '../button/button.ts';
import searchForm from '../forms/searchForm/index.ts';

export default new ChatsSection({
  searchForm,
  createChatBtn: new Button({
    text: 'Create a chat',
    attr: { class: 'btn', type: 'button' },
    events: {},
  }),
  attr: { class: 'chats-section' },
});
