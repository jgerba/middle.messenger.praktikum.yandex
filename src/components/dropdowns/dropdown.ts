import Block from '../../core/block.ts';

import { PropsType, ChildrenType } from '../../core/types.ts';

export default class Dropdown extends Block {
  dropdown: HTMLElement;

  icon: HTMLElement;

  // for listener removing
  bindedCloseHandler: (event: MouseEvent) => void;

  constructor(props: PropsType | ChildrenType) {
    const onClick = () => this.openDropdownHandler.bind(this)();

    super('article', { ...props, events: { click: onClick } });

    this.bindedCloseHandler = this.closeDropdownHandler.bind(this);

    this.dropdown = this.element!.querySelector('.dropdown')!;
    this.icon = this.element!.querySelector('img')!;
  }

  openDropdownHandler() {
    // click on dropdown btn toggle dropdown view
    if (this.dropdown.classList.contains('hidden')) {
      this.openDropdown();
      return;
    }

    this.closeDropdown();
  }

  openDropdown() {
    this.dropdown.classList.remove('hidden');
    this.icon.classList.add('active');

    document.addEventListener('click', this.bindedCloseHandler);
  }

  closeDropdown() {
    this.dropdown.classList.add('hidden');
    this.icon.classList.remove('active');

    document.removeEventListener('click', this.bindedCloseHandler);
  }

  closeDropdownHandler(event: MouseEvent) {
    if (this.element?.contains(event.target as Node)) {
      return;
    }

    this.closeDropdown();
  }
}
