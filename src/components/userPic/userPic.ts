import tpl from './userPic.hbs?raw';
import Block, { ChildrenType, PropsType } from '../../core/block.js';
import Modal from '../modals/fileModal/fileModal.ts';
import Button from '../button/button.ts';
import Input from '../inputs/input.ts';

export default class UserPic extends Block {
  constructor(props: PropsType | ChildrenType) {
    const onOpenModal = () => this.openModal.bind(this)();

    super('div', { ...props, events: { click: onOpenModal } });
  }

  render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }

  openModal() {
    /* eslint no-new: 0 */

    new Modal({
      fileInput: new Input({
        name: 'avatar',
        text: 'Choose file on PC',
        upload: true,
        type: 'file',
        attr: { class: 'input-wrapper', title: 'Add file' },
        events: {},
      }),
      submitBtn: new Button({
        text: 'Change',
        attr: { class: 'btn', type: 'submit' },
      }),

      attr: { class: 'modal' },
      events: {},
    });
  }
}
