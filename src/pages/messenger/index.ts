import Button from '../../components/button/button.ts';
import chatHeader from '../../components/chatHeader/index.ts';
import messageForm from '../../components/forms/messageForm/index.ts';
import searchForm from '../../components/forms/searchForm/index.ts';
import Messenger from './messenger.ts';

export default new Messenger({
  searchForm,
  createChatBtn: new Button({
    text: 'Create a chat',
    attr: { class: 'btn', type: 'button' },
    events: {},
  }),
  chatHeader,
  messageForm,
  attr: { class: 'main chat' },
});

