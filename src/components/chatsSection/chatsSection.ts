import tpl from './chatsSection.hbs?raw';
import Block from '../../core/block.ts';
import store, { StoreEvents } from '../../core/store.ts';
import WSController from '../../controllers/WS-controller.ts';
import connect from '../../core/connect.ts';

import ChatPreview from '../chatPreview/chatPreview.ts';
import fallbackImg from '../../static/svg/fallback-img.svg';

import formatDate from '../../utils/formatDate.ts';
import isEqual from '../../utils/isEqual.ts';
import getDataToUpdate from '../../utils/getUpdateData.ts';
import { PropsType, ChildrenType, IndexedType } from '../../core/types.ts';
import { BASE_URL } from '../../core/const.ts';

/* eslint no-use-before-define:0 */
/* eslint prefer-template:0 */

export default class ChatsSection extends Block {
  private _prevChats: PropsType[] | undefined;

  private _previewRoot: HTMLElement;

  constructor(tagName: string, props: PropsType | ChildrenType) {
    const onAnchorClick = (event: MouseEvent) => this.anchorHandler(event);

    super(tagName, { ...props, events: { click: onAnchorClick } });

    this._previewRoot = this.element!.querySelector(
      '.chats-section__previews',
    )!;

    this.updateChats();

    store.on(StoreEvents.Updated, this.updateChats.bind(this));
  }

  protected render(): DocumentFragment {
    // remove events & attr data from props
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }

  private updateChats() {
    const newChatsData = this.getChats();

    if (!newChatsData) {
      this.filterPreviews();
      return;
    }

    if (!this._prevChats) {
      this._prevChats = [...newChatsData];
      this.renderPreviews();
      return;
    }

    const chatToAdd = getDataToUpdate(newChatsData, this._prevChats);
    const chatToRemove = getDataToUpdate(this._prevChats, newChatsData);

    if (chatToRemove.length > 0) {
      this.removePreview(chatToRemove);
    }

    if (chatToAdd.length > 0) {
      const { newChat } = store.getState();

      if ((newChat as IndexedType)?.id) {
        // append new chat to previous rendered chats
        this.renderPreviews(chatToAdd, true);
        this._prevChats = [...newChatsData];
        store.clearStatePath('newChat');
        return;
      }

      // prepend chat to previous rendered chats
      this.renderPreviews(chatToAdd);
    }

    this._prevChats = [...newChatsData];
  }

  private getChats(): PropsType[] | null {
    const chatsData = store.getState().chats as unknown;

    const isSameData = isEqual(
      chatsData as PropsType[],
      this._prevChats as PropsType[],
    );

    if (isSameData) {
      return null;
    }

    return chatsData as PropsType[];
  }

  private removePreview(chatData: PropsType[]) {
    const chatToDelete = this._previewRoot.querySelector(
      `article[data-id="${chatData[0].id}"]`,
    );
    chatToDelete?.remove();
  }

  private renderPreviews(chatsData = this._prevChats, prepend = false) {
    if (!chatsData) {
      this._previewRoot.innerHTML = '';
      return;
    }

    chatsData.forEach((chat) => {
      prepend
        ? this._previewRoot.prepend(this.chatPreviewConstructor(chat))
        : this._previewRoot.append(this.chatPreviewConstructor(chat));
    });

    this.filterPreviews();
  }

  private filterPreviews() {
    const state = store.getState();
    const filterVal = (state.chatsFilter as IndexedType)?.filterVal as string;
    // compare filterVal with prevFilterVal

    this._previewRoot.querySelectorAll('article').forEach((el) => {
      const hasMatch = (el.title as string).toLowerCase().includes(filterVal);

      if (hasMatch || !filterVal) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    });
  }

  private chatPreviewConstructor(chatData: PropsType): HTMLElement {
    const ConnectedPreview = connect(ChatPreview, getChatData);

    function getChatData(state: IndexedType): PropsType {
      const chats = state.chats as unknown;

      const currentChat = (chats as IndexedType[])?.find(
        (chat) => chat.id === chatData.id,
      );

      return {
        avatar: (currentChat?.avatar as string)
          ? `${BASE_URL}/resources/${currentChat?.avatar}`
          : fallbackImg,
        title: currentChat?.title as string,
        time: (currentChat?.last_message as PropsType)
          ? formatDate((currentChat?.last_message as PropsType).time as string)
          : '',
        unreadCount: currentChat?.unread_count as string,
        lastMessage: handleMessage(currentChat?.last_message as PropsType),
      };
    }

    function handleMessage(data: PropsType): string {
      if (!data) {
        return '';
      }

      const msgData = data.content as string;
      const msgUser = (data.user as PropsType).login as string;
      const currentUser = (store.getState().user as IndexedType)
        .login as string;

      let user;
      msgUser === currentUser ? (user = 'You') : (user = msgUser);

      let message = `${user}: ${msgData}`;
      if (message.length > 64) {
        message = `${message.slice(0, 64)}...`;
      }

      return message;
    }

    return new ConnectedPreview('article', {
      attr: {
        class: 'chat-preview',
        title: chatData.title as string,
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

  private async openChatHandler(
    chatId: string,
    chatAvatar: string,
    chatTitle: string,
  ) {
    // if the same chat return
    if ((store.getState().currentChat as IndexedType)?.id === chatId) {
      return;
    }

    const response = await WSController.getToken({ id: chatId });

    if (response === 200) {
      store.setState('currentChat', {
        avatar: chatAvatar,
        title: chatTitle,
        id: chatId,
      });

      WSController.connect({ chatId });
    }
  }

  private anchorHandler(event: MouseEvent) {
    if (!(event.target as HTMLElement).classList.contains('settings-link')) {
      return;
    }
    event.preventDefault();
    store.getRouter().go('/settings');
  }
}
