import ChatHeader from './chatHeader.ts';
import headerDropdown from '../headerDropdown/index.ts';
import dotsSvg from './svg/dots.svg';

export default new ChatHeader({
  headerDropdown,
  dotsSvg,
  attr: { class: 'chat-header' },
});

