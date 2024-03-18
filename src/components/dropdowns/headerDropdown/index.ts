import DropdownOption from '../../dropdownOption/dropdownOption.ts';
import HeaderDropdown from './headerDropdown.ts';
import addSvg from './svg/add.svg';
import removeSvg from './svg/remove.svg';
import btnIcon from './svg/dots.svg';
import removeChatSvg from './svg/remove-chat.svg';

export default new HeaderDropdown({
  addUserBtn: new DropdownOption({
    alt: 'Add user',
    text: 'Add user',
    icon: addSvg,
    attr: { class: 'dropdown-option' },
    events: {},
  }),
  removeUserBtn: new DropdownOption({
    alt: 'Remove user',
    text: 'Remove user',
    icon: removeSvg,
    attr: { class: 'dropdown-option' },
    events: {},
  }),
  removeChatBtn: new DropdownOption({
    alt: 'Remove chat',
    text: 'Remove chat',
    icon: removeChatSvg,
    attr: { class: 'dropdown-option' },
    events: {},
  }),

  btnIcon,
  attr: { class: 'dropdown-root' },
  events: {},
});
