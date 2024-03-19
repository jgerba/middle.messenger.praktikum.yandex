import HTTPTransport from '../core/HTTPTransport.ts';
import WSTransport from '../core/WSTransport.ts';

import store from '../core/store.ts';

import { DataType, IndexedType } from '../core/types.ts';
import { BASE_URL } from '../core/const.ts';

const chatApi = new HTTPTransport(`${BASE_URL}/chats`);

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
