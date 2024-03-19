import HTTPTransport from '../core/HTTPTransport.ts';
import { BASE_URL } from '../core/const.ts';

import { DataType, AddUsersDataType } from '../core/types.ts';

const api = new HTTPTransport(`${BASE_URL}/chats`);

class ChatsApi {
  async getChats() {
    return api.get('');
  }

  async createChat(options: DataType) {
    return api.post('', options);
  }

  async deleteChat(options: DataType) {
    return api.delete('', options);
  }

  async addUsers(options: AddUsersDataType) {
    return api.put('/users', options);
  }

  async removeUsers(options: AddUsersDataType) {
    return api.delete('/users', options);
  }

  async changeAvatar(options: AddUsersDataType) {
    return api.put('/avatar', options);
  }

  async removeChat(options: AddUsersDataType) {
    return api.delete('', options);
  }
}

export default new ChatsApi();
