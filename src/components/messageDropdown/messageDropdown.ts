import tpl from './messageDropdown.hbs?raw';
import Block, { PropsType, ChildrenType } from '../../core/block.ts';

export default class MessageDropdown extends Block {
  openDropBtn: ChildrenType;

  constructor(props: PropsType | ChildrenType) {
    super('article', props);

    this.initOpenDropBtn();
  }

  render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }

  initOpenDropBtn() {
    this.openDropBtn = this.children.dropdownBtn;
    this.openDropBtn.addEvent('click', this.openDropdown.bind(this));
  }

  openDropdown() {
    const dropdown = this.element!.querySelector('.dropdown')!;
    const icon = this.openDropBtn.element!.querySelector('img')!;

    dropdown.classList.toggle('hidden');
    icon.classList.toggle('active');
  }
}
