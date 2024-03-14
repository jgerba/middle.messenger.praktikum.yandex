import authAPI from '../api/auth-api';
import store from '../core/store.ts';
import router from '../main';

import messenger from '../pages/messenger/index.ts';
import settings from '../pages/settings/index.ts';

type DataType = { [key: string]: Record<string, string> };
type ResponseType = {
  [key: string]: Record<string, string | { [key: string]: string }> | number;
};

class AuthController {
  async createUser(submitData: DataType) {
    authAPI
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
    authAPI
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
    authAPI
      .getUser()
      .then(({ status, response }: ResponseType) => {
        console.log(status, response);

        if (status !== 200) {
          throw new Error(
            `${status} ${(response as { [key: string]: string }).reason}`,
          );
        }

        store.setState('isAuth', true);

        store.setState('user', response);

        router.use('/messenger', messenger);
        router.use('/settings', settings);
        router.go('/messenger');
      })
      .catch((error) => {
        console.log(error);
        router.go('/');
      });
  }

  async logOut() {
    authAPI
      .logOut()
      .then(({ status, response }: ResponseType) => {
        console.log(status);

        if (status !== 200) {
          throw new Error(
            `${status} ${(response as { [key: string]: string }).reason}`,
          );
        }

        store.clearStore();
        router.go('/');
      })
      .catch((error) => console.log(error));
  }
}

export default new AuthController();
