import UserAPI from '../api/user-api';

type DataType = { [key: string]: Record<string, string> | FormData };
type ResponseType = {
  [key: string]: Record<string, string | { [key: string]: string }> | number;
};

export default class UserController {
  static async changeUser(submitData: DataType) {
    UserAPI.changeUser(submitData)
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

  static async changeAvatar(submitData: DataType) {
    UserAPI.changeAvatar(submitData)
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

  static async changePassword(submitData: DataType) {
    UserAPI.changePassword(submitData)
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

  static async searchUser(submitData: DataType) {
    UserAPI.searchUser(submitData)
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
