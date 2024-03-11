import HTTPTransport from '../core/HTTPTransport';

type OptionsType = { [key: string]: Record<string, string> };

const api = new HTTPTransport('https://ya-praktikum.tech/api/v2/auth');

export default class AuthAPI {
  static async createUser(options: OptionsType) {
    return api.post('/signup', options);
  }

  static async logIn(options: OptionsType) {
    return api.post('/signin', options);
  }

  static async getUser() {
    return api.get('/user');
  }

  static async logOut() {
    return api.post('/logout');
  }
}
