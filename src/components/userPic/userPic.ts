import tpl from './userPic.hbs?raw';
import Block, { ChildrenType, PropsType } from '../../core/block.js';
import Modal from '../modals/fileModal/fileModal.ts';
import Button from '../button/button.ts';
import Input from '../inputs/input.ts';

export default class UserPic extends Block {
  modalRoot: HTMLElement;

  constructor(props: PropsType | ChildrenType) {
    const onClick = () => this.clickHandle.bind(this)();

    super('div', { ...props, events: { click: onClick } });

    this.modalRoot = document.getElementById('modal')!;
  }

  render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }

  clickHandle() {
    const modal = new Modal({
      fileInput: new Input({
        name: 'avatar',
        text: 'Choose file on PC',
        upload: true,
        attr: { class: 'input-wrapper ', type: 'file' },
        events: {},
      }),
      submitBtn: new Button({
        text: 'Change',
        attr: { class: 'btn', type: 'submit' },
      }),

      attr: { class: 'modal' },
      events: {},
    });

    const modalEl: HTMLElement = modal.getContent()!;

    this.modalRoot.append(modalEl);

    modal.addEvent('click', (event: Event) =>
      this.closeModal.bind(this, event, modalEl)(),
    );
  }

  closeModal(event: Event, el: HTMLElement) {
    if ((event.target as HTMLElement).title !== 'Backdrop') return;
    el.remove();
  }
}

