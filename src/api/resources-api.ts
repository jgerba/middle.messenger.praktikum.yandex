import HTTPTransport from '../core/HTTPTransport.ts';
import { BASE_URL } from '../core/const.ts';

import { AddUsersDataType } from '../core/types.ts';

const api = new HTTPTransport(`${BASE_URL}/resources`);

/* eslint consistent-return:0 */

class ResourcesApi {
  async uploadImage(options: AddUsersDataType) {
    return api.post('/', options);
  }

  async getImage(options: AddUsersDataType) {
    if ('chatId' in options.data) {
      return api.get(`/${options.data.path}`);
    }
  }
}

export default new ResourcesApi();
