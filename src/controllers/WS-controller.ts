import WSApi from '../api/WS-api.ts';
import store from '../core/store.ts';

import { DataType, ResponseType, IndexedType } from '../core/types.ts';

/* eslint consistent-return:0 */

class WSController {
  async getToken(data: DataType): Promise<number | undefined> {
    try {
      const { status, response }: ResponseType = (await WSApi.getToken(
        data,
      )) as ResponseType;
      console.log(status, response);

      if (status !== 200) {
        throw new Error(
          `${status} ${(response as { [key: string]: string }).reason}`,
        );
      }

      store.setState('currentChat', response);

      return status;
    } catch (error) {
      console.log(error);
    }
  }

  connect(data: DataType) {
    const userId = (store.getState().user as IndexedType).id;

    const sendData: { [key: string]: string } = { ...data, userId } as {
      [key: string]: string;
    };

    WSApi.connect(sendData);
  }

  close() {
    WSApi.close();
  }

  sendMessage(data: { [key: string]: string }) {
    WSApi.send({ content: data.message, type: 'message' });
  }
}

export default new WSController();
