import chatHeader from '../../components/chatHeader/index.ts';
import messageForm from '../../components/messageForm/index.ts';
import searchForm from '../../components/searchForm/index.ts';
import ChatPage from './chat.ts';

export default new ChatPage({
  searchForm,
  chatHeader,
  messageForm,
  attr: { class: 'main chat' },
});
