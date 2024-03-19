import Block, { ChildrenType, PropsType } from '../../core/block.js';

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

  initModal() {
    const modalRoot = document.getElementById('modal-root')!;
    modalRoot.append(this.element!);
  }

  clickHandler(event: Event) {
    if ((event.target as HTMLElement).title === 'Backdrop') {
      this.closeModal();
    }
  }

  closeModal() {
    this.element!.remove();
  }

  submitHandler(event: SubmitEvent) {
    event.preventDefault();
  }
}
