import chatHeader from '../../components/chatHeader/index.ts';
import messageForm from '../../components/forms/messageForm/index.ts';
import searchForm from '../../components/forms/searchForm/index.ts';
import ChatPage from './chat.ts';

export default new ChatPage({
  searchForm,
  chatHeader,
  messageForm,
  attr: { class: 'main chat' },
});
