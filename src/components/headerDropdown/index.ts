import DropdownBtn from '../dropdownBtn/dropdownBtn.ts';
import DropdownOption from '../dropdownOption/dropdownOption.ts';
import HeaderDropdown from './headerDropdown.ts';
import addSvg from './svg/add.svg';
import removeSvg from './svg/remove.svg';
import btnIcon from './svg/dots.svg';

export default new HeaderDropdown({
  dropdownBtn: new DropdownBtn({
    btnIcon,
    attr: { class: 'chat-header__dropdown-btn' },
    events: {},
  }),

  addUserBtn: new DropdownOption({
    alt: 'Add user',
    text: 'Add user',
    icon: addSvg,
    attr: { class: 'dropdown-option' },
  }),
  removeUserBtn: new DropdownOption({
    alt: 'Remove user',
    text: 'Remove user',
    icon: removeSvg,
    attr: { class: 'dropdown-option' },
  }),
});
