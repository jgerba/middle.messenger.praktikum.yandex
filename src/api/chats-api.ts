import HTTPTransport from '../core/HTTPTransport.ts';
import { BASE_URL } from '../core/const.ts';

type OptionsType = {
  [key: string]: Record<string, string> | FormData | string;
};

type AddUsersDataType = {
  data: {
    users: number[];
    chatId: number;
  };
};

const api = new HTTPTransport(`${BASE_URL}/chats`);

class ChatsApi {
  async getChats() {
    return api.get('');
  }

  async createChat(options: OptionsType) {
    return api.post('', options);
  }

  async deleteChat(options: OptionsType) {
    return api.delete('', options);
  }

  async addUsers(options: AddUsersDataType) {
    return api.put('/users', options);
  }

  async removeUsers(options: AddUsersDataType) {
    return api.delete('/users', options);
  }
}

export default new ChatsApi();
