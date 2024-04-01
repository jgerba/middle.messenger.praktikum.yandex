import chatApi from '../api/chats-api.ts';
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
    chatApi
      .getChats()
      .then(({ status, response }: ResponseType) => {
        if (status !== 200) {
          throw new Error(
            `${status} ${(response as { [key: string]: string }).reason}`,
          );
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

        return response;
      })
      .catch((error) => console.log(error));
  }

  async createChat(data: DataType) {
    try {
      const { status, response }: ResponseType = (await chatApi.createChat(
        data,
      )) as ResponseType;

      if (status !== 200) {
        throw new Error(
          `${status} ${(response as { [key: string]: string }).reason}`,
        );
      }

      // need to append new chat to already rendered chats
      store.setState('newChat', response);
      this.getChats();

      return status;
    } catch (error) {
      console.log(error);
    }
  }

  async addUsers(submitData: AddUsersDataType) {
    try {
      const { status, response }: ResponseType = (await chatApi.addUsers(
        submitData,
      )) as ResponseType;

      if (status !== 200) {
        throw new Error(
          `${status} ${(response as { [key: string]: string }).reason}`,
        );
      }

      return status;
    } catch (error) {
      console.log(error);
    }
  }

  async removeUsers(submitData: AddUsersDataType) {
    try {
      const { status, response }: ResponseType = (await chatApi.removeUsers(
        submitData,
      )) as ResponseType;

      if (status !== 200) {
        throw new Error(
          `${status} ${(response as { [key: string]: string }).reason}`,
        );
      }

      return status;
    } catch (error) {
      console.log(error);
    }
  }

  async changeAvatar(submitData: AddUsersDataType) {
    try {
      const { status, response }: ResponseType = (await chatApi.changeAvatar(
        submitData,
      )) as ResponseType;

      if (status !== 200) {
        throw new Error(
          `${status} ${(response as { [key: string]: string }).reason}`,
        );
      }

      this.getChats();

      return status;
    } catch (error) {
      console.log(error);
    }
  }

  async removeChat(submitData: AddUsersDataType) {
    try {
      const { status, response }: ResponseType = (await chatApi.removeChat(
        submitData,
      )) as ResponseType;

      if (status !== 200) {
        throw new Error(
          `${status} ${(response as { [key: string]: string }).reason}`,
        );
      }

      this.getChats();
      store.clearStatePath('currentChat');

      return status;
    } catch (error) {
      console.log(error);
    }
  }

  async getChatUsers(submitData: AddUsersDataType) {
    try {
      const { status, response }: ResponseType = (await chatApi.getChatUsers(
        submitData,
      )) as ResponseType;

      if (status !== 200) {
        throw new Error(
          `${status} ${(response as { [key: string]: string }).reason}`,
        );
      }

      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new ChatsController();
