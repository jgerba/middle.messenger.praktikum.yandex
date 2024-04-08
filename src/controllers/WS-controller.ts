import WSApi from '../api/WS-api.ts';
import loader from '../components/loader/index.ts';
import store from '../core/store.ts';

import { DataType, ResponseType, IndexedType } from '../core/types.ts';

/* eslint consistent-return:0 */

class WSController {
  async getToken(data: DataType): Promise<number | undefined> {
    try {
      loader.show();

      const { status, response }: ResponseType = (await WSApi.getToken(
        data,
      )) as ResponseType;

      if (status !== 200) {
        throw new Error(
          `${status} ${(response as { [key: string]: string }).reason}`,
        );
      }

      store.clearStatePath('currentChat');
      store.setState('currentChat', response);

      loader.hide();

      return status;
    } catch (error) {
      store.setState('popUp', { message: error, isError: true });
      loader.hide();
    }
  }

  connect(data: DataType) {
    const userId = (store.getState().user as IndexedType).id;
    const WStoken = (store.getState().currentChat as IndexedType).token;

    const sendData: { [key: string]: string } = {
      ...data,
      userId,
      WStoken,
    } as {
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
