import tpl from './chatsSection.hbs?raw';
import Block, { PropsType, ChildrenType } from '../../core/block.ts';
import ChatPreview from '../chatPreview/chatPreview.ts';
import fallbackImg from './svg/fallback-img.svg';
// import router from '../../main.ts';

import Modal from '../modals/textModal/textModal.ts';
import FormInput from '../inputs/formInput.ts';
import Button from '../button/button.ts';
// import chatsController from '../../controllers/chats-controller.ts';
import store, { StoreEvents } from '../../core/store.ts';

/* eslint no-use-before-define:0 */
/* eslint prefer-template:0 */

export default class ChatsSection extends Block {
  constructor(tagName: string, props: PropsType | ChildrenType) {
    const onAnchorClick = (event: MouseEvent) => this.anchorHandler(event);

    super(tagName, { ...props, events: { click: onAnchorClick } });

    this.initBtns();

    store.on(StoreEvents.Updated, this.renderPreviews.bind(this));
  }

  render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }

  initBtns() {
    const createChatBtn = this.children.createChatBtn as Block;

    createChatBtn.addEvent('click', this.openCreateModal.bind(this));
  }

  renderPreviews() {
    const previewSection = this.element!.querySelector(
      '.chat__chats-preview',
    ) as HTMLElement;

    const chatsData = store.getState().chats as unknown;

    previewSection.innerHTML = '';

    (chatsData as PropsType[]).forEach((chat) => {
      previewSection.append(
        new ChatPreview({
          avatar: chat.avatar || fallbackImg,
          title: chat.title,
          time: (chat.last_message as PropsType)
            ? ((chat.last_message as PropsType).time as Date)
            : '',
          unreadCount: chat.unread_count,
          lastMessage: chat.lastMessage,
          attr: { class: 'chat-preview' },
          events: { click: this.chatPreviewHandler },
        }).getContent() as HTMLElement,
      );
    });
  }

  getTime(timestamp: number): string {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const mins = date.getMinutes();
    return `${hours < 10 ? '0' + hours : hours}:${
      mins < 10 ? '0' + mins : mins
    }`;
  }

  chatPreviewHandler() {
    console.log('Chat is openeing...');
  }

  openCreateModal() {
    /* eslint no-new: 0 */

    new Modal({
      textInput: new FormInput({
        name: 'title',
        text: 'Chat title',
        attr: { class: 'input-wrapper ' },
      }),
      submitBtn: new Button({
        text: 'Create',
        attr: { class: 'btn', type: 'submit' },
      }),

      modalHeader: 'New chat',
      attr: { class: 'modal' },
      events: {},
    });
  }

  anchorHandler(event: MouseEvent) {
    if (!(event.target as HTMLElement).classList.contains('settings-link')) {
      return;
    }
    event.preventDefault();
    store.getRouter().go('/settings');
  }
}
