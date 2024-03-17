import HTTPTransport from '../core/HTTPTransport.ts';
import WSTransport from '../core/WSTransport.ts';
import store from '../core/store.ts';

type IndexedType = {
  [key: string]: string | number | IndexedType;
};

type DataType = { [key: string]: Record<string, string> | FormData | string };

const chatApi = new HTTPTransport('https://ya-praktikum.tech/api/v2/chats');

class WSApi {
  socket: WSTransport;

  async getToken(options: DataType) {
    return chatApi.post(`/token/${options.id}`);
  }

  connect({ userId, chatId }: DataType) {
    const WStoken = (store.getState().currentChat as IndexedType).token;

    this.socket = new WSTransport(
      `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${WStoken}`,
    );
    this.socket.connect();
  }

  close() {
    this.socket.close();
  }

  send(data: DataType) {
    this.socket.send(data);
  }
}

export default new WSApi();
