import Block, { ChildrenType, PropsType } from '../../core/block.js';

export default class Modal extends Block {
  constructor(props: PropsType | ChildrenType) {
    const onClick = (event: Event) => this.clickHandle.bind(this, event)();

    super('section', { ...props, events: { click: onClick } });

    this.initModal();
  }

  initModal() {
    const modalRoot = document.getElementById('modal')!;
    modalRoot.append(this.element!);
  }

  clickHandle(event: Event) {
    if ((event.target as HTMLElement).title === 'Add file') {
      this.fileInputHandle();
    }

    if ((event.target as HTMLElement).title === 'Backdrop') {
      this.closeModal();
    }
  }

  fileInputHandle() {
    /* eslint class-methods-use-this: 0 */
    /* eslint no-console: 0 */

    console.log('input');
  }

  closeModal() {
    this.element!.remove();
  }
}
