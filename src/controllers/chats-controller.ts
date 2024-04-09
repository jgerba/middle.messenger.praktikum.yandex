import chatApi from '../api/chats-api.ts';
import loader from '../components/loader/index.ts';
import { POP_MSG } from '../core/const.ts';
import store from '../core/store.ts';

import {
  DataType,
  AddUsersDataType,
  IndexedType,
  ResponseType,
} from '../core/types.ts';

/* eslint consistent-return:0 */

class ChatsController {
  // to do - set chats offset & limit

  async getChats() {
    loader.show();

    chatApi
      .getChats()
      .then(({ status, response }: ResponseType) => {
        if (status !== 200) {
          throw new Error(`${status} Something went wrong`);
        }

        store.setState('chats', response);

        const state = store.getState();

        // upd chat avatar
        if (state.currentChat) {
          const currentId = (state.currentChat as IndexedType).id;
          const storedChats = state.chats as unknown;

          const sameChat = (storedChats as IndexedType[]).filter(
            (chat) => chat.id === currentId,
          );

          if (
            sameChat ||
            (state.currentChat as IndexedType).avatar !==
              (sameChat[0] as IndexedType).avatar
          ) {
            store.setState('currentChat', {
              avatar: (sameChat[0] as IndexedType).avatar,
            });
          }
        }

        loader.hide();

        return response;
      })
      .catch((error) => {
        store.setState('popUp', { message: error, isError: true });
        loader.hide();
      });
  }

  async createChat(data: DataType) {
    try {
      loader.show();

      const { status, response }: ResponseType = (await chatApi.createChat(
        data,
      )) as ResponseType;

      if (status !== 200) {
        throw new Error(
          `${status} ${(response as { [key: string]: string }).reason}`,
        );
      }

      store.setState('popUp', { message: POP_MSG.CHAT_CREATE });

      // need for appending new chat to already rendered chats
      store.setState('newChat', response);

      loader.hide();

      this.getChats();

      return status;
    } catch (error) {
      store.setState('popUp', { message: error, isError: true });
      loader.hide();
    }
  }

  async addUsers(submitData: AddUsersDataType) {
    try {
      loader.show();

      const { status, response }: ResponseType = (await chatApi.addUsers(
        submitData,
      )) as ResponseType;

      if (status !== 200) {
        throw new Error(
          `${status} ${(response as { [key: string]: string }).reason}`,
        );
      }

      store.setState('popUp', { message: POP_MSG.USER_ADD });

      loader.hide();

      return status;
    } catch (error) {
      store.setState('popUp', { message: error, isError: true });
      loader.hide();
    }
  }

  async removeUsers(submitData: AddUsersDataType) {
    try {
      loader.show();

      const { status, response }: ResponseType = (await chatApi.removeUsers(
        submitData,
      )) as ResponseType;

      if (status !== 200) {
        throw new Error(
          `${status} ${(response as { [key: string]: string }).reason}`,
        );
      }

      store.setState('popUp', { message: POP_MSG.USER_REMOVE });

      loader.hide();

      return status;
    } catch (error) {
      store.setState('popUp', { message: error, isError: true });
      loader.hide();
    }
  }

  async changeAvatar(submitData: AddUsersDataType) {
    try {
      loader.show();

      const { status, response }: ResponseType = (await chatApi.changeAvatar(
        submitData,
      )) as ResponseType;

      if (status !== 200) {
        throw new Error(
          `${status} ${(response as { [key: string]: string }).reason}`,
        );
      }

      store.setState('popUp', { message: POP_MSG.IMG_UPDATE });

      loader.hide();

      this.getChats();

      return status;
    } catch (error) {
      store.setState('popUp', { message: error, isError: true });
      loader.hide();
    }
  }

  async removeChat(submitData: AddUsersDataType) {
    try {
      loader.show();

      const { status }: ResponseType = (await chatApi.removeChat(
        submitData,
      )) as ResponseType;

      if (status !== 200) {
        throw new Error(`${status} Something went wrong`);
      }

      store.setState('popUp', { message: POP_MSG.CHAT_DELETE });
      store.clearStatePath('currentChat');

      loader.hide();

      this.getChats();

      return status;
    } catch (error) {
      store.setState('popUp', { message: error, isError: true });
      loader.hide();
    }
  }

  async getChatUsers(submitData: AddUsersDataType) {
    try {
      loader.show();

      const { status, response }: ResponseType = (await chatApi.getChatUsers(
        submitData,
      )) as ResponseType;

      if (status !== 200) {
        throw new Error(`${status} Something went wrong`);
      }

      loader.hide();

      return response;
    } catch (error) {
      store.setState('popUp', { message: error, isError: true });
      loader.hide();
    }
  }
}

export default new ChatsController();
