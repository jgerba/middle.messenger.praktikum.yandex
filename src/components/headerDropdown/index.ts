import DropdownOption from '../dropdownOption/dropdownOption.ts';
import HeaderDropdown from './headerDropdown.ts';
import addSvg from './svg/add.svg';
import removeSvg from './svg/remove.svg';

export default new HeaderDropdown({
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

  attr: { class: 'dropdown header-drop hidden' },
});
