import tpl from './currentChat.hbs?raw';
import Block, { PropsType, ChildrenType } from '../../core/block.ts';
import store, { StoreEvents } from '../../core/store.ts';
import Message from '../message/message.ts';
import isReadSvg from './svg/isRead.svg';
import formatDate from '../../utils/formatDate.ts';

/* eslint no-use-before-define:0 */
/* eslint prefer-template:0 */

type IndexedType = {
  [key: string]: string | number | IndexedType;
};

export default class CurrentChat extends Block {
  constructor(props: PropsType | ChildrenType) {
    super('section', props);

    this.renderChat();
    store.on(StoreEvents.Updated, this.renderChat.bind(this));
  }

  render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }

  renderChat() {
    const chatRoot = this.element!.querySelector(
      '.current-chat__dialog',
    ) as HTMLElement;

    const state = store.getState();

    if (!state.currentChat) {
      return;
    }

    const messages = (state.currentChat as IndexedType).messages as unknown;

    if (!messages) {
      return;
    }

    chatRoot.innerHTML = '';

    (messages as PropsType[])
      .sort((a, b) => {
        const bTime = new Date(b.time as string) as unknown;
        const aTime = new Date(a.time as string) as unknown;

        return (aTime as number) - (bTime as number);
      })
      .forEach((message) => {
        const isPersonalMsg =
          message.user_id === (state.user as IndexedType).id;

        chatRoot.prepend(
          new Message({
            content: message.content,
            time: formatDate(message.time as string),
            isRead: message.isRead,
            isReadSvg,
            attr: {
              class: `message ${isPersonalMsg ? 'personal-message' : ''}`,
            },
          }).getContent() as HTMLElement,
        );
      });
  }
}
