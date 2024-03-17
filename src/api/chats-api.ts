import HTTPTransport from '../core/HTTPTransport.ts';

type OptionsType = {
  [key: string]: Record<string, string> | FormData | string;
};

type AddUsersDataType = {
  data: {
    users: number[]; // Тип для users изменен с any[] на number[]
    chatId: number;
  };
};

const api = new HTTPTransport('https://ya-praktikum.tech/api/v2/chats');

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
