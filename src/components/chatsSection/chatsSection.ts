import tpl from './chatsSection.hbs?raw';
import Block from '../../core/block.ts';
import store, { StoreEvents } from '../../core/store.ts';
import WSController from '../../controllers/WS-controller.ts';

import ChatPreview from '../chatPreview/chatPreview.ts';
import fallbackImg from '../../static/svg/fallback-img.svg';

import formatDate from '../../utils/formatDate.ts';
import { PropsType, ChildrenType } from '../../core/types.ts';
import { BASE_URL } from '../../core/const.ts';
import isEqual from '../../utils/isEqual.ts';

/* eslint no-use-before-define:0 */
/* eslint prefer-template:0 */

export default class ChatsSection extends Block {
  prevChats: PropsType[] | undefined;

  previewRoot: HTMLElement;

  constructor(tagName: string, props: PropsType | ChildrenType) {
    const onAnchorClick = (event: MouseEvent) => this.anchorHandler(event);

    super(tagName, { ...props, events: { click: onAnchorClick } });

    this.previewRoot = this.element!.querySelector('.chats-section__previews')!;

    this.updateChats();

    store.on(StoreEvents.Updated, this.updateChats.bind(this));
  }

  render(): DocumentFragment {
    // remove events & attr data from props
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }

  private getChats(): PropsType[] | null {
    const newChatsData = store.getState().chats as unknown;
    const isSameData = isEqual(
      newChatsData as PropsType[],
      this.prevChats as PropsType[],
    );

    if (isSameData) {
      return null;
    }

    return newChatsData as PropsType[];
  }

  renderPreviews(chatsData = this.prevChats, prepend = false) {
    if (!chatsData) {
      this.previewRoot.innerHTML = '';
      return;
    }

    chatsData.forEach((chat) => {
      prepend
        ? this.previewRoot.prepend(this.chatPreviewConstructor(chat))
        : this.previewRoot.append(this.chatPreviewConstructor(chat));
    });
  }

  getDataToUpdate(
    leftArr: PropsType[],
    rightArr: PropsType[],
  ): PropsType[] | [] {
    const resultArr: PropsType[] = [];

    leftArr.forEach((leftArrChat) => {
      const hasChat = rightArr?.find(
        (rightArrChat) => rightArrChat.id === leftArrChat.id,
      );

      if (!hasChat) {
        resultArr.push(leftArrChat);
      }
    });

    return resultArr;
  }

  removePreview(chatData: PropsType[]) {
    const chatToDelete = this.previewRoot.querySelector(
      `article[data-id="${chatData[0].id}"]`,
    );
    chatToDelete?.remove();
  }

  private updateChats() {
    const newChatsData = this.getChats();

    if (!newChatsData) {
      return;
    }

    if (!this.prevChats) {
      this.prevChats = newChatsData;
      this.renderPreviews();
      return;
    }

    const chatToAdd = this.getDataToUpdate(newChatsData, this.prevChats);
    const chatToRemove = this.getDataToUpdate(this.prevChats, newChatsData);

    if (chatToRemove.length > 0) {
      this.removePreview(chatToRemove);
    }

    if (chatToAdd.length > 0) {
      const { newChat } = store.getState();

      if (newChat) {
        // append new chat to previous rendered chats
        this.renderPreviews(chatToAdd, true);
        store.clearStatePath('newChat');
      } else {
        // prepend chat to previous rendered chats
        this.renderPreviews(chatToAdd);
      }
    }

    this.prevChats = newChatsData;
  }

  async openChatHandler(chatId: string, chatAvatar: string, chatTitle: string) {
    const response = await WSController.getToken({ id: chatId });

    if (response === 200) {
      store.setState('currentChat', {
        avatar: chatAvatar,
        title: chatTitle,
        id: chatId,
      });

      WSController.connect({ chatId });
    }

    console.log(store.getState().currentChat);
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
      attr: {
        class: 'chat-preview',
        'data-id': chatData.id as number,
      },
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

  anchorHandler(event: MouseEvent) {
    if (!(event.target as HTMLElement).classList.contains('settings-link')) {
      return;
    }
    event.preventDefault();
    store.getRouter().go('/settings');
  }
}
