import HTTPTransport from '../core/HTTPTransport.ts';
import { BASE_URL } from '../core/const.ts';

import { DataType } from '../core/types.ts';

const api = new HTTPTransport(`${BASE_URL}/user`);

class UserApi {
  async changeUser(options: DataType) {
    return api.put('/profile', options);
  }

  async changeAvatar(options: DataType) {
    return api.put('/profile/avatar', options);
  }

  async changePassword(options: DataType) {
    return api.put('/password', options);
  }

  async searchUser(options: DataType) {
    return api.post('/search', options);
  }
}

export default new UserApi();
