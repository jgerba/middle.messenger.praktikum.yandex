import HTTPTransport from '../core/HTTPTransport.ts';

type OptionsType = { [key: string]: Record<string, string> | FormData };

const api = new HTTPTransport('https://ya-praktikum.tech/api/v2/user');

class UserAPI {
  async changeUser(options: OptionsType) {
    return api.put('/profile', options);
  }

  async changeAvatar(options: OptionsType) {
    return api.put('/profile/avatar', options);
  }

  async changePassword(options: OptionsType) {
    return api.put('/password', options);
  }

  async searchUser(options: OptionsType) {
    return api.post('/user/search', options);
  }
}

export default new UserAPI();