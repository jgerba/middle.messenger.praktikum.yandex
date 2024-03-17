import HTTPTransport from '../core/HTTPTransport.ts';

type OptionsType = {
  [key: string]: Record<string, string> | FormData | string;
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

  async addChatUser(options: OptionsType) {
    return api.put('/users', options);
  }

  async deleteChatUser(options: OptionsType) {
    return api.delete('/users', options);
  }
}

export default new ChatsApi();
