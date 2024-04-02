import Block from '../../core/block.ts';

import { PropsType, ChildrenType } from '../../core/types.ts';

export default class Dropdown extends Block {
  private dropdown: HTMLElement;

  private icon: HTMLElement;

  // for listener removing
  private bindedCloseHandler: (event: MouseEvent) => void;

  constructor(props: PropsType | ChildrenType) {
    const onClick = () => this.openDropdownHandler.bind(this)();

    super('article', { ...props, events: { click: onClick } });

    this.bindedCloseHandler = this.closeDropdownHandler.bind(this);

    this.dropdown = this.element!.querySelector('.dropdown')!;
    this.icon = this.element!.querySelector('img')!;
  }

  protected openDropdownHandler() {
    // click on dropdown btn toggle dropdown view
    if (this.dropdown.classList.contains('hidden')) {
      this.openDropdown();
      return;
    }

    this.closeDropdown();
  }

  protected openDropdown() {
    this.dropdown.classList.remove('hidden');
    this.icon.classList.add('active');

    document.addEventListener('click', this.bindedCloseHandler);
  }

  protected closeDropdown() {
    this.dropdown.classList.add('hidden');
    this.icon.classList.remove('active');

    document.removeEventListener('click', this.bindedCloseHandler);
  }

  protected closeDropdownHandler(event: MouseEvent) {
    if (this.element?.contains(event.target as Node)) {
      return;
    }

    this.closeDropdown();
  }
}
