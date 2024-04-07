import resourcesApi from '../api/resources-api.ts';
import WSController from './WS-controller.ts';

import loader from '../components/loader/index.ts';
import store from '../core/store.ts';

import { MSG_KEYS, POP_MSG } from '../core/const.ts';
import { AddUsersDataType, ResponseType } from '../core/types.ts';

/* eslint consistent-return:0 */

class ResourcesController {
  async uploadImage(submitData: AddUsersDataType) {
    try {
      loader.show();

      const { status, response }: ResponseType =
        (await resourcesApi.uploadImage(submitData)) as ResponseType;

      if (status !== 200) {
        throw new Error(
          `${status} ${(response as { [key: string]: string }).reason}`,
        );
      }

      store.setState('popUp', { message: POP_MSG.IMG_UPLOAD });

      loader.hide();

      WSController.sendMessage({
        message: `${MSG_KEYS.IMAGE_KEY}${
          (response as { [key: string]: string }).path
        }`,
      });

      return status;
    } catch (error) {
      store.setState('popUp', { message: error, isError: true });
      loader.hide();
    }
  }
}

export default new ResourcesController();
