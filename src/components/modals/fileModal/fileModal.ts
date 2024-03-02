import tpl from './fileModal.hbs?raw';
import Block, { ChildrenType, PropsType } from '../../../core/block.js';

export default class Modal extends Block {
  constructor(props: PropsType | ChildrenType) {
    super('section', props);

    this.initInput();
  }

  render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }

  initInput() {
    this.children.fileInput.addEvent('click', (event: Event) =>
      this.handleInput.bind(this, event)(),
    );
  }

  handleInput(event: Event) {
    if ((event.target as HTMLElement).tagName !== 'LABEL') return;
    console.log(111);

    const input = this.element!.querySelector('input')!;
    input.click();
  }
}

