import HTTPTransport from '../core/HTTPTransport.ts';
import { BASE_URL } from '../core/const.ts';

import { DataType } from '../core/types.ts';

const api = new HTTPTransport(`${BASE_URL}/auth`);

class AuthApi {
  async createUser(options: DataType) {
    return api.post('/signup', options);
  }

  async logIn(options: DataType) {
    return api.post('/signin', options);
  }

  async getUser() {
    return api.get('/user');
  }

  async logOut() {
    return api.post('/logout');
  }
}

export default new AuthApi();
