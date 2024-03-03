import ChatHeader from './chatHeader.ts';
import headerDropdown from '../dropdowns/headerDropdown/index.ts';

export default new ChatHeader({
  headerDropdown,
  name: 'Имя',
  attr: { class: 'chat-header' },
});
