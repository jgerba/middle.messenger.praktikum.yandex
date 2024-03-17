import WSApi from '../api/WS-api.ts';
import store from '../core/store.ts';

type DataType = { [key: string]: Record<string, string> | FormData | string };
type ResponseType = {
  [key: string]: Record<string, string | { [key: string]: string }> | number;
};

type IndexedType = {
  [key: string]: string | number | IndexedType;
};

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

  sendMessage(data: DataType) {
    WSApi.send(data);
  }
}

export default new WSController();
