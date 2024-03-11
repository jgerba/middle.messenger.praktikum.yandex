import AuthAPI from '../api/auth-api';
import router from '../main';

import messenger from '../pages/messenger/index.ts';
import settings from '../pages/settings/index.ts';

type DataType = { [key: string]: Record<string, string> };
type ResponseType = {
  [key: string]: Record<string, string | { [key: string]: string }> | number;
};

export default class AuthController {
  static async createUser(submitData: DataType) {
    AuthAPI.createUser(submitData)
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

  static async logIn(submitData: DataType) {
    AuthAPI.logIn(submitData)
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

  static async getUser() {
    AuthAPI.getUser()
      .then(({ status, response }: ResponseType) => {
        console.log(status, response);

        if (status !== 200) {
          throw new Error(
            `${status} ${(response as { [key: string]: string }).reason}`,
          );
        }

        router.use('/messenger', messenger);
        router.use('/settings', settings);
        router.go('/messenger');
      })
      .catch((error) => {
        console.log(error);
        router.go('/');
      });
  }

  static async logOut() {
    AuthAPI.logOut()
      .then(({ status, response }: ResponseType) => {
        console.log(status);

        if (status !== 200) {
          throw new Error(
            `${status} ${(response as { [key: string]: string }).reason}`,
          );
        }

        router.go('/');
      })
      .catch((error) => console.log(error));
  }
}