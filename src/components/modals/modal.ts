import Block from '../../core/block.js';

import { PropsType, ChildrenType } from '../../core/types.ts';

export default class Modal extends Block {
  constructor(props: PropsType | ChildrenType) {
    const onClick = (event: MouseEvent) =>
      this.clickHandler.bind(this, event)();
    const onSubmit = (event: SubmitEvent) =>
      this.submitHandler.bind(this, event)();

    super('section', {
      ...props,
      events: { click: onClick, submit: onSubmit },
    });

    this.initModal();
  }

  private initModal() {
    const modalRoot = document.getElementById('modal-root')!;
    modalRoot.append(this.element!);
  }

  private clickHandler(event: Event) {
    if ((event.target as HTMLElement).title === 'Backdrop') {
      this.closeModal();
    }
  }

  protected closeModal() {
    this.element!.remove();
  }

  protected submitHandler(event: SubmitEvent) {
    event.preventDefault();
  }
}
