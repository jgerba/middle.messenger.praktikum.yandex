import userApi from '../api/user-api.ts';
import { MSGS } from '../core/const.ts';
import store from '../core/store.ts';

import { DataType, ResponseType } from '../core/types.ts';

/* eslint consistent-return:0 */

class UserController {
  async changeUser(submitData: DataType) {
    userApi
      .changeUser(submitData)
      .then(({ status, response }: ResponseType) => {
        if (status !== 200) {
          throw new Error(
            `${status} ${(response as { [key: string]: string }).reason}`,
          );
        }
        store.setState('popUp', { message: MSGS.USER_UPDATE });
        store.setState('user', response);
      })
      .catch((error) => {
        store.setState('popUp', { message: error, isError: true });
      });
  }

  async changeAvatar(submitData: DataType) {
    try {
      const { status, response }: ResponseType = (await userApi.changeAvatar(
        submitData,
      )) as ResponseType;

      if (status !== 200) {
        throw new Error(
          `${status} ${(response as { [key: string]: string }).reason}`,
        );
      }

      store.setState('popUp', { message: MSGS.IMG_UPDATE });
      store.setState('user', response);
      return status;
    } catch (error) {
      store.setState('popUp', { message: error, isError: true });
    }
  }

  async changePassword(submitData: DataType) {
    try {
      const { status, response }: ResponseType = (await userApi.changePassword(
        submitData,
      )) as ResponseType;

      if (status !== 200) {
        throw new Error(
          `${status} ${(response as { [key: string]: string }).reason}`,
        );
      }

      store.setState('popUp', { message: MSGS.PSW_CHANGE });
      return status;
    } catch (error) {
      store.setState('popUp', { message: error, isError: true });
    }
  }

  async searchUser(submitData: DataType) {
    try {
      const { status, response }: ResponseType = (await userApi.searchUser(
        submitData,
      )) as ResponseType;

      if (status !== 200) {
        throw new Error(
          `${status} ${(response as { [key: string]: string }).reason}`,
        );
      }

      return response;
    } catch (error) {
      store.setState('popUp', { message: error, isError: true });
    }
  }
}

export default new UserController();
