import HTTPTransport from '../core/HTTPTransport.ts';

type OptionsType = { [key: string]: Record<string, string> };

const api = new HTTPTransport('https://ya-praktikum.tech/api/v2/auth');

class AuthAPI {
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

export default new AuthAPI();
