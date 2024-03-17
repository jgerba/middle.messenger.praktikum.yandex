import chatAPI from '../api/chats-api.ts';
import store from '../core/store.ts';

type DataType = { [key: string]: Record<string, string> | FormData | string };
type ResponseType = {
  [key: string]: Record<string, string | { [key: string]: string }> | number;
};

class ChatsController {
  // to do - set chats offset & limit

  async getChats() {
    chatAPI
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
    chatAPI
      .createChat(data)
      .then(({ status, response }: ResponseType) => {
        console.log(status, response);

        if (status !== 200) {
          throw new Error(
            `${status} ${(response as { [key: string]: string }).reason}`,
          );
        }

        this.getChats();
      })
      .catch((error) => console.log(error));
  }

  async getWStoken(data: DataType): Promise<number | undefined> {
    try {
      const { status, response }: ResponseType = (await chatAPI.getWStoken(
        data,
      )) as ResponseType;
      console.log(status, response);

      if (status !== 200) {
        throw new Error(
          `${status} ${(response as { [key: string]: string }).reason}`,
        );
      }

      store.setState('currentChat', response);
      return status;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new ChatsController();

