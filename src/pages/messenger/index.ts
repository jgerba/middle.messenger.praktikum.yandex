import Messenger from './messenger.ts';

import chatsSection from '../../components/chatsSection/index.ts';
import currentChat from '../../components/currentChat/index.ts';

export default new Messenger({
  chatsSection,
  currentChat,
  attr: { class: 'main' },
});
