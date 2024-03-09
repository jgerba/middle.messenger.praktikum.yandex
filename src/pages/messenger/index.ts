import chatHeader from '../../components/chatHeader/index.ts';
import messageForm from '../../components/forms/messageForm/index.ts';
import searchForm from '../../components/forms/searchForm/index.ts';
import Messenger from './messenger.ts';

export default new Messenger({
  searchForm,
  chatHeader,
  messageForm,
  attr: { class: 'main chat' },
});
