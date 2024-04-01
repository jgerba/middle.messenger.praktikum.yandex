import tpl from './removeUserModal.hbs?raw';
import Modal from '../modal.js';
import store from '../../../core/store.js';

import chatsController from '../../../controllers/chats-controller.js';
import UserListItem from '../../userListItem/userListItem.js';

import { ChildrenType, PropsType } from '../../../core/types.js';

export default class RemoveUserModal extends Modal {
  chatId: number | null;

  usersList: HTMLElement;

  constructor(props: PropsType | ChildrenType) {
    super(props);

    this.chatId = null;
    this.usersList = this.element!.querySelector('.modal__users')!;

    this.getUsers();
  }

  render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }

  async getUsers() {
    const state = store.getState();
    this.chatId = (state.currentChat as { [key: string]: number })?.id;
    if (!this.chatId) {
      return;
    }

    const chatUsers = (await chatsController.getChatUsers({
      data: { chatId: this.chatId },
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

  renderUsers(users: PropsType[] | undefined) {
    console.log(users);

    if (!users || users.length === 0) {
      this.usersList.innerHTML = 'No users...';
      return;
    }

    users.forEach((user) => {
      this.usersList.append(this.userItemConstructor(user));
    });
  }

  userItemConstructor(user: PropsType) {
    return new UserListItem({
      text: user.login,
      attr: { class: 'remove-user', 'data-id': user.id as number },
      events: { click: this.userHandler.bind(this, user.id) },
    }).getContent() as HTMLElement;
  }

  async userHandler(id: number) {
    if (!id || !this.chatId) {
      return;
    }

    const dataToSend = {
      data: {
        users: [id],
        chatId: this.chatId,
      },
    };

    const status = await chatsController.removeUsers(dataToSend);
    status === 200 ? this.removeUser(id) : this.handleError();
  }

  removeUser(id: number) {
    const liToRemove = this.usersList.querySelector(`li[data-id="${id}"]`);
    liToRemove?.remove();

    if (!this.usersList.querySelector('li[data-id]')) {
      this.usersList.innerHTML = 'No users...';
    }
  }

  handleError() {
    console.log('Error handling...');
  }
}
