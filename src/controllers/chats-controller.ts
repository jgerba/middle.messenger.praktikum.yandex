import chatAPI from '../api/chats-api.ts';
import store from '../core/store.ts';

type DataType = { [key: string]: Record<string, string> | FormData };
type ResponseType = {
  [key: string]: Record<string, string | { [key: string]: string }> | number;
};

class ChatsController {
  async getChats(data: DataType) {
    chatAPI
      .getChats(data)
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
      })
      .catch((error) => console.log(error));
  }
}

export default new ChatsController();
