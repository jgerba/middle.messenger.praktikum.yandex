import tpl from './chatsSection.hbs?raw';
import Block from '../../core/block.ts';
import store, { StoreEvents } from '../../core/store.ts';
import WSController from '../../controllers/WS-controller.ts';

import ChatPreview from '../chatPreview/chatPreview.ts';
import Modal from '../modals/textModal/textModal.ts';
import FormInput from '../inputs/formInput.ts';
import Button from '../button/button.ts';
import fallbackImg from '../../static/svg/fallback-img.svg';

import formatDate from '../../utils/formatDate.ts';
import { PropsType, ChildrenType } from '../../core/types.ts';
import { BASE_URL } from '../../core/const.ts';

/* eslint no-use-before-define:0 */
/* eslint prefer-template:0 */

export default class ChatsSection extends Block {
  constructor(tagName: string, props: PropsType | ChildrenType) {
    const onAnchorClick = (event: MouseEvent) => this.anchorHandler(event);

    super(tagName, { ...props, events: { click: onAnchorClick } });

    this.initBtns();

    this.renderPreviews();
    store.on(StoreEvents.Updated, this.renderPreviews.bind(this));
  }

  render(): DocumentFragment {
    // remove events & attr data from props
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }

  initBtns() {
    const createChatBtn = this.children.createChatBtn as Block;

    createChatBtn.addEvent('click', this.openCreateModal.bind(this));
  }

  renderPreviews() {
    const previewRoot = this.element!.querySelector(
      '.chat__chats-preview',
    ) as HTMLElement;

    const chatsData = store.getState().chats as unknown;
    if (!chatsData) return;

    previewRoot.innerHTML = '';

    (chatsData as PropsType[]).forEach((chat) => {
      previewRoot.append(this.chatPreviewConstructor(chat));
    });
  }

  async openChatHandler(chatId: string, chatAvatar: string, chatTitle: string) {
    const response = await WSController.getToken({ id: chatId });

    if (response === 200) {
      store.setState('currentChat', { avatar: chatAvatar });
      store.setState('currentChat', { title: chatTitle });
      store.setState('currentChat', { id: chatId });
      WSController.connect({ chatId });
    }

    console.log(store.getState().currentChat);
  }

  openCreateModal() {
    /* eslint no-new: 0 */

    new Modal({
      textInput: new FormInput('div', {
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

  chatPreviewConstructor(chatData: PropsType): HTMLElement {
    return new ChatPreview('article', {
      avatar: (chatData.avatar as string)
        ? `${BASE_URL}/resources/${chatData.avatar}`
        : fallbackImg,
      title: chatData.title,
      time: (chatData.last_message as PropsType)
        ? formatDate((chatData.last_message as PropsType).time as string)
        : '',
      unreadCount: chatData.unread_count,
      lastMessage: chatData.lastMessage,
      attr: { class: 'chat-preview' },
      events: {
        click: this.openChatHandler.bind(
          this,
          chatData.id,
          chatData.avatar,
          chatData.title,
        ),
      },
    }).getContent() as HTMLElement;
  }
}
