import CurrentChat from './currentChat.ts';

import chatHeader from '../chatHeader/index.ts';
import chatsSection from '../chatsSection/index.ts';
import messageForm from '../forms/messageForm/index.ts';

export default new CurrentChat({
  chatsSection,
  chatHeader,
  messageForm,
  attr: { class: 'current-chat' },
});
