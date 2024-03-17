import userApi from '../api/user-api.ts';
import store from '../core/store.ts';

type DataType = { [key: string]: Record<string, string> | FormData };
type ResponseType = {
  [key: string]: Record<string, string | { [key: string]: string }> | number;
};

class UserController {
  async changeUser(submitData: DataType) {
    userApi
      .changeUser(submitData)
      .then(({ status, response }: ResponseType) => {
        console.log(status, response);

        if (status !== 200) {
          throw new Error(
            `${status} ${(response as { [key: string]: string }).reason}`,
          );
        }

        store.setState('user', response);
      })
      .catch((error) => console.log(error));
  }

  async changeAvatar(submitData: DataType) {
    userApi
      .changeAvatar(submitData)
      .then(({ status, response }: ResponseType) => {
        console.log(status, response);

        if (status !== 200) {
          throw new Error(
            `${status} ${(response as { [key: string]: string }).reason}`,
          );
        }

        store.setState('user', response);
      })
      .catch((error) => console.log(error));
  }

  async changePassword(submitData: DataType) {
    userApi
      .changePassword(submitData)
      .then(({ status, response }: ResponseType) => {
        console.log(status);

        if (status !== 200) {
          throw new Error(
            `${status} ${(response as { [key: string]: string }).reason}`,
          );
        }
      })
      .catch((error) => console.log(error));
  }

  async searchUser(submitData: DataType) {
    userApi
      .searchUser(submitData)
      .then(({ status, response }: ResponseType) => {
        console.log(status, response);

        if (status !== 200) {
          throw new Error(
            `${status} ${(response as { [key: string]: string }).reason}`,
          );
        }
      })
      .catch((error) => console.log(error));
  }
}

export default new UserController();
