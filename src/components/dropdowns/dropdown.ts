import Block, { PropsType, ChildrenType } from '../../core/block.ts';

export default class Dropdown extends Block {
  constructor(props: PropsType | ChildrenType) {
    super('article', props);
  }

  initOpenDropBtn() {
    this.addEvent('click', this.openDropdown.bind(this));
  }

  openDropdown() {
    const dropdown = this.element!.querySelector('.dropdown')!;
    const icon = this.element!.querySelector('img')!;

    dropdown.classList.toggle('hidden');
    icon.classList.toggle('active');
  }
}
