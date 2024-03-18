import chatApi from '../api/chats-api.ts';
import store from '../core/store.ts';

type DataType = { [key: string]: Record<string, string> | FormData | string };
type AddUsersDataType = {
  data: {
    users: number[];
    chatId: number;
  };
};
type ResponseType = {
  [key: string]: Record<string, string | { [key: string]: string }> | number;
};

class ChatsController {
  // to do - set chats offset & limit

  async getChats() {
    chatApi
      .getChats()
      .then(({ status, response }: ResponseType) => {
        console.log(status, response);

        if (status !== 200) {
          throw new Error(
            `${status} ${(response as { [key: string]: string }).reason}`,
          );
        }

        store.setState('chats', response);
      })
      .catch((error) => console.log(error));
  }

  async createChat(data: DataType) {
    try {
      const { status, response }: ResponseType = (await chatApi.createChat(
        data,
      )) as ResponseType;
      console.log(status, response);

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

  async addUsers(submitData: AddUsersDataType) {
    try {
      const { status, response }: ResponseType = (await chatApi.addUsers(
        submitData,
      )) as ResponseType;
      console.log(status, response);

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
      console.log(status, response);

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
}

export default new ChatsController();

