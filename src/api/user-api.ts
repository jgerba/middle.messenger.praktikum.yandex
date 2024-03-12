import HTTPTransport from '../core/HTTPTransport';

type OptionsType = { [key: string]: Record<string, string> | FormData };

const api = new HTTPTransport('https://ya-praktikum.tech/api/v2/user');

export default class UserAPI {
  static async changeUser(options: OptionsType) {
    return api.put('/profile', options);
  }

  static async changeAvatar(options: OptionsType) {
    return api.put('/profile/avatar', options);
  }

  static async changePassword(options: OptionsType) {
    return api.put('/password', options);
  }

  static async searchUser(options: OptionsType) {
    return api.post('/user/search', options);
  }
}
