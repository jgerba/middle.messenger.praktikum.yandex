import authApi from '../api/auth-api.ts';
import store from '../core/store.ts';
// import router from '../main.ts';

import messenger from '../pages/messenger/index.ts';
import settings from '../pages/settings/index.ts';
import loader from '../components/loader/index.ts';
import chatsController from './chats-controller.ts';

import { DataType, ResponseType } from '../core/types.ts';
import { MSGS } from '../core/const.ts';

class AuthController {
  async createUser(submitData: DataType) {
    loader.show();

    authApi
      .createUser(submitData)
      .then(({ status, response }: ResponseType) => {
        if (status !== 200) {
          throw new Error(
            `${status} ${(response as { [key: string]: string }).reason}`,
          );
        }

        store.setState('popUp', { message: MSGS.USER_CREATE });

        loader.hide();

        this.getUser();
      })
      .catch((error) => {
        store.setState('popUp', { message: error, isError: true });
        loader.hide();
      });
  }

  async logIn(submitData: DataType) {
    loader.show();

    authApi
      .logIn(submitData)
      .then(({ status, response }: ResponseType) => {
        if (status !== 200) {
          throw new Error(
            `${status} ${(response as { [key: string]: string }).reason}`,
          );
        }

        store.setState('popUp', { message: MSGS.USER_LOGIN });
        this.getUser();

        loader.hide();
      })
      .catch((error) => {
        store.setState('popUp', { message: error, isError: true });
        loader.hide();
      });
  }

  async getUser() {
    loader.show();

    authApi
      .getUser()
      .then(({ status, response }: ResponseType) => {
        if (status !== 200) {
          throw new Error(
            `${status} ${(response as { [key: string]: string }).reason}`,
          );
        }

        store.setState('user', response);
        chatsController.getChats();

        store.setState('popUp', { message: MSGS.USER_REDIRECT });

        store.getRouter().use('/messenger', messenger);
        store.getRouter().use('/settings', settings);
        store.getRouter().go('/messenger');

        loader.hide();
      })
      .catch((error) => {
        store.setState('popUp', { message: error, isError: true });
        store.getRouter().go('/');
        loader.hide();
      });
  }

  async logOut() {
    loader.show();

    authApi
      .logOut()
      .then(({ status }: ResponseType) => {
        if (status !== 200) {
          throw new Error(`${status} Something went wrong`);
        }

        store.setState('popUp', { message: MSGS.USER_LOGOUT });
        store.clearState();
        store.getRouter().go('/');

        loader.hide();
      })
      .catch((error) => {
        store.setState('popUp', { message: error, isError: true });
        loader.hide();
      });
  }
}

export default new AuthController();
