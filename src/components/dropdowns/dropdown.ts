import Block, { PropsType, ChildrenType } from '../../core/block.ts';

export default class Dropdown extends Block {
  constructor(props: PropsType | ChildrenType) {
    super('article', props);
  }

  initOpenDropBtn() {
    this.addEvent('click', (event: Event) =>
      this.openDropdown.bind(this, event)(),
    );
  }

  openDropdown(event: Event) {
    if ((event.target as HTMLElement).title !== 'Open dropdown') return;

    const dropdown = this.element!.querySelector('.dropdown')!;
    const icon = this.element!.querySelector('img')!;

    dropdown.classList.toggle('hidden');
    icon.classList.toggle('active');
  }
}
