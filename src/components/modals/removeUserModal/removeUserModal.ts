import tpl from './removeUserModal.hbs?raw';
import Modal from '../modal.js';
import store from '../../../core/store.js';

import chatsController from '../../../controllers/chats-controller.js';
import UserListItem from '../../userListItem/userListItem.js';

import { ChildrenType, PropsType } from '../../../core/types.js';

export default class RemoveUserModal extends Modal {
  private _chatId: number | null;

  private _usersList: HTMLElement;

  constructor(props: PropsType | ChildrenType) {
    super(props);

    this._chatId = null;
    this._usersList = this.element!.querySelector('.modal__users')!;

    this.getUsers();
  }

  protected render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }

  private async getUsers() {
    const state = store.getState();
    this._chatId = (state.currentChat as { [key: string]: number })?.id;
    if (!this._chatId) {
      return;
    }

    const chatUsers = (await chatsController.getChatUsers({
      data: { chatId: this._chatId },
    })) as PropsType[] | undefined;

    if (!chatUsers) {
      return;
    }

    const myId = (state.user as { [key: string]: number }).id;
    const myIndex = chatUsers.findIndex((chatUser) => chatUser.id === myId)!;

    if (myIndex !== -1) {
      chatUsers?.splice(myIndex, 1);
    }

    this.renderUsers(chatUsers);
  }

  private renderUsers(users: PropsType[] | undefined) {
    if (!users || users.length === 0) {
      this._usersList.innerHTML = 'No users...';
      return;
    }

    users.forEach((user) => {
      this._usersList.append(this.userItemConstructor(user));
    });
  }

  private userItemConstructor(user: PropsType) {
    return new UserListItem({
      text: user.login,
      attr: { class: 'remove-user', 'data-id': user.id as number },
      events: { click: this.userHandler.bind(this, user.id) },
    }).getContent() as HTMLElement;
  }

  private async userHandler(id: number) {
    if (!id || !this._chatId) {
      return;
    }

    const dataToSend = {
      data: {
        users: [id],
        chatId: this._chatId,
      },
    };

    const status = await chatsController.removeUsers(dataToSend);

    if (status === 200) {
      this.removeUser(id);
    }
  }

  private removeUser(id: number) {
    const liToRemove = this._usersList.querySelector(`li[data-id="${id}"]`);
    liToRemove?.remove();

    if (!this._usersList.querySelector('li[data-id]')) {
      this._usersList.innerHTML = 'No users...';
    }
  }
}
