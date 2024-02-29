import ChatHeader from './chatHeader.ts';
import headerDropdown from '../headerDropdown/index.ts';

export default new ChatHeader({
  headerDropdown,
  attr: { class: 'chat-header' },
});
