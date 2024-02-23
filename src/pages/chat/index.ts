import chatHeader from '../../components/chatHeader';
import messageForm from '../../components/messageForm';
import searchForm from '../../components/searchForm';
import ChatPage from './chat';

export default new ChatPage({
    searchForm,
    chatHeader,
    messageForm,
    attr: { class: 'main chat' },
});
