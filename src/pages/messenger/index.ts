import Messenger from './messenger.ts';

import chatHeader from '../../components/chatHeader/index.ts';
import chatsSection from '../../components/chatsSection/index.ts';
import messageForm from '../../components/forms/messageForm/index.ts';

export default new Messenger({
  chatsSection,
  chatHeader,
  messageForm,
  attr: { class: 'main chat' },
});
