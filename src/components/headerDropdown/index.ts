import DropdownBtn from '../dropdownBtn/dropdownBtn.ts';
import HeaderDropdown from './headerDropdown.ts';
import addSvg from './svg/add.svg';
import removeSvg from './svg/remove.svg';

export default new HeaderDropdown({
  addUserBtn: new DropdownBtn({
    alt: 'Add user',
    text: 'Add user',
    icon: addSvg,
    attr: { class: 'dropdown-btn' },
  }),
  removeUserBtn: new DropdownBtn({
    alt: 'Remove user',
    text: 'Remove user',
    icon: removeSvg,
    attr: { class: 'dropdown-btn' },
  }),

  attr: { class: 'dropdown header-drop hidden' },
});
