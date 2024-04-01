import tpl from './avatarInput.hbs?raw';
import Block from '../../core/block.js';

import Modal from '../modals/fileModal/fileModal.ts';
import Button from '../button/button.ts';
import Input from '../inputs/input.ts';

import { PropsType, ChildrenType } from '../../core/types.ts';

export default class AvatarInput extends Block {
  isChatAvatar: boolean;

  constructor(tagName: string, props: PropsType | ChildrenType) {
    const onOpenModal = () => this.openModal.bind(this)();

    super(tagName, { ...props, events: { click: onOpenModal } });

    this.isChatAvatar = (
      props.attr as { [key: string]: string }
    ).class.includes('chatpic');
  }

  render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }

  openModal() {
    /* eslint no-new: 0 */

    // use to define endpoint for pic upload
    let origin;
    this.isChatAvatar ? (origin = 'chat') : (origin = 'user');

    new Modal({
      fileInput: new Input('div', {
        name: 'avatar',
        text: 'Choose file on PC',
        upload: true,
        type: 'file',
        attr: { class: 'input-wrapper', title: 'Add file' },
        events: {},
      }),
      submitBtn: new Button('button', {
        text: 'Change',
        attr: { class: 'btn', type: 'submit' },
      }),

      origin,
      attr: { class: 'modal' },
      events: {},
    });
  }
}
