import AuthAPI from '../api/auth-api';
import router from '../main';

type DataType = { [key: string]: Record<string, string> };

export default class AuthController {
  static async createUser(submitData: DataType) {
    AuthAPI.createUser(submitData)
      .then(({ status, response }: DataType) =>
        console.log({ status, response }),
      )
      .then(() => this.getUser());
  }

  static async logIn(submitData: DataType) {
    AuthAPI.logIn(submitData)
      .then((res: DataType) => console.log(res.status))
      .then(() => this.getUser());
  }

  static async getUser() {
    AuthAPI.getUser()
      .then(({ status, response }: DataType) =>
        console.log({ status, response }),
      )
      .then(() => {
        router.go('/messenger');
      });
  }

  static async logOut() {
    AuthAPI.logOut()
      .then((res: DataType) => console.log(res.status))
      .then(() => {
        router.go('/');
      });
  }
}
