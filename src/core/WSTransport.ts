import EventBus from './event-bus.ts';
import store from './store.ts';

import { IndexedType, DataType } from './types.ts';

export default class WSTransport extends EventBus {
  private _api: string;

  private _socket: WebSocket;

  private _pingInterval: ReturnType<typeof setInterval> | null;

  constructor(api: string) {
    super();

    this._api = api;
  }

  public connect() {
    if (this._socket) {
      this.close();
    }

    this._socket = new WebSocket(this._api);

    this._subscribe();
    this._setupPing();
  }

  public close() {
    if (!this._socket) {
      throw new Error('No Socket');
    }

    this._socket.close(1000, 'Chat closed');
    clearInterval(this._pingInterval!);
    this._pingInterval = null;
  }

  private _subscribe() {
    this._socket.addEventListener('open', () => {
      this.send({
        content: '0',
        type: 'get old',
      });
    });
    this._socket.addEventListener('_close', () => {
      console.log('closed');
    });
    this._socket.addEventListener('error', () => {
      console.log('error');
    });
    this._socket.addEventListener('message', (event) => {
      this._get(event);
    });
  }

  public send(data: DataType) {
    if (!this._socket) {
      throw new Error('No Socket');
    }

    this._socket.send(JSON.stringify(data));
  }

  private _get(event: MessageEvent) {
    try {
      const data = JSON.parse(event.data);

      if (!data || ['pong', 'user connected'].includes(data.type)) {
        return;
      }

      let dataToStore = data;

      // if is new message
      if (dataToStore.id) {
        const state = store.getState();
        const currentMessages = (state.currentChat as IndexedType)
          .messages as unknown;
        (currentMessages as IndexedType[]).push(dataToStore);

        dataToStore = currentMessages;
      }

      store.setState('currentChat', { messages: dataToStore });
    } catch (error) {
      console.log(error);
    }
  }

  private _setupPing() {
    this._pingInterval = setInterval(() => {
      this.send({ type: 'ping' });
    }, 30000);
  }
}
