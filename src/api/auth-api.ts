import HTTPTransport from '../core/HTTPTransport.ts';
import { BASE_URL } from '../core/const.ts';

type OptionsType = { [key: string]: Record<string, string> };

const api = new HTTPTransport(`${BASE_URL}/auth`);

class AuthApi {
  async createUser(options: OptionsType) {
    return api.post('/signup', options);
  }

  async logIn(options: OptionsType) {
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
