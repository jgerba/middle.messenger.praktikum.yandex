import authApi from '../api/auth-api.ts';
import store from '../core/store.ts';
// import router from '../main.ts';

import messenger from '../pages/messenger/index.ts';
import settings from '../pages/settings/index.ts';
import chatsController from './chats-controller.ts';

import { DataType, ResponseType } from '../core/types.ts';

class AuthController {
  async createUser(submitData: DataType) {
    authApi
      .createUser(submitData)
      .then(({ status, response }: ResponseType) => {
        console.log(status, response);

        if (status !== 200) {
          throw new Error(
            `${status} ${(response as { [key: string]: string }).reason}`,
          );
        }

        this.getUser();
      })
      .catch((error) => console.log(error));
  }

  async logIn(submitData: DataType) {
    authApi
      .logIn(submitData)
      .then(({ status, response }: ResponseType) => {
        console.log(status);

        if (status !== 200) {
          throw new Error(
            `${status} ${(response as { [key: string]: string }).reason}`,
          );
        }

        this.getUser();
      })
      .catch((error) => console.log(error));
  }

  async getUser() {
    authApi
      .getUser()
      .then(({ status, response }: ResponseType) => {
        console.log(status, response);

        if (status !== 200) {
          throw new Error(
            `${status} ${(response as { [key: string]: string }).reason}`,
          );
        }

        store.setState('user', response);
        chatsController.getChats();

        store.getRouter().use('/messenger', messenger);
        store.getRouter().use('/settings', settings);
        store.getRouter().go('/messenger');
      })
      .catch((error) => {
        console.log(error);
        setTimeout(() => {
          store.getRouter().go('/');
        }, 3000);
      });
  }

  async logOut() {
    authApi
      .logOut()
      .then(({ status, response }: ResponseType) => {
        console.log(status);

        if (status !== 200) {
          throw new Error(
            `${status} ${(response as { [key: string]: string }).reason}`,
          );
        }

        store.clearState();
        store.getRouter().go('/');
      })
      .catch((error) => console.log(error));
  }
}

export default new AuthController();
