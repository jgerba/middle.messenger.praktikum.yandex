import userApi from '../api/user-api.ts';
import loader from '../components/loader/index.ts';
import { MSGS } from '../core/const.ts';
import store from '../core/store.ts';

import { DataType, ResponseType } from '../core/types.ts';

/* eslint consistent-return:0 */

class UserController {
  async changeUser(submitData: DataType) {
    loader.show();

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

        loader.hide();
      })
      .catch((error) => {
        store.setState('popUp', { message: error, isError: true });
        loader.hide();
      });
  }

  async changeAvatar(submitData: DataType) {
    try {
      loader.show();

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

      loader.hide();

      return status;
    } catch (error) {
      store.setState('popUp', { message: error, isError: true });
      loader.hide();
    }
  }

  async changePassword(submitData: DataType) {
    try {
      loader.show();

      const { status, response }: ResponseType = (await userApi.changePassword(
        submitData,
      )) as ResponseType;

      if (status !== 200) {
        throw new Error(
          `${status} ${(response as { [key: string]: string }).reason}`,
        );
      }

      store.setState('popUp', { message: MSGS.PSW_CHANGE });

      loader.hide();

      return status;
    } catch (error) {
      store.setState('popUp', { message: error, isError: true });
      loader.hide();
    }
  }

  async searchUser(submitData: DataType) {
    try {
      loader.show();

      const { status, response }: ResponseType = (await userApi.searchUser(
        submitData,
      )) as ResponseType;

      if (status !== 200) {
        throw new Error(
          `${status} ${(response as { [key: string]: string }).reason}`,
        );
      }
      loader.hide();

      return response;
    } catch (error) {
      store.setState('popUp', { message: error, isError: true });
      loader.hide();
    }
  }
}

export default new UserController();
