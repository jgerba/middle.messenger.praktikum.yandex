import userApi from '../api/user-api.ts';
import store from '../core/store.ts';

type DataType = { [key: string]: Record<string, string> | FormData | string };
type ResponseType = {
  [key: string]: Record<string, string | { [key: string]: string }> | number;
};

/* eslint consistent-return:0 */

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
    try {
      const { status, response }: ResponseType = (await userApi.changeAvatar(
        submitData,
      )) as ResponseType;
      console.log(status, response);

      if (status !== 200) {
        throw new Error(
          `${status} ${(response as { [key: string]: string }).reason}`,
        );
      }

      store.setState('user', response);
      return status;
    } catch (error) {
      console.log(error);
    }
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
    try {
      const { status, response }: ResponseType = (await userApi.searchUser(
        submitData,
      )) as ResponseType;
      console.log(status, response);

      if (status !== 200) {
        throw new Error(
          `${status} ${(response as { [key: string]: string }).reason}`,
        );
      }

      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new UserController();
