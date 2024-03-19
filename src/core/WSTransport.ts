import EventBus from './event-bus.ts';
import store from './store.ts';

import { IndexedType, DataType } from './types.ts';

export default class WSTransport extends EventBus {
  api: string;

  socket: WebSocket;

  pingInterval: ReturnType<typeof setInterval> | null;

  constructor(api: string) {
    super();

    this.api = api;
  }

  connect() {
    if (this.socket) {
      this.close();
    }

    this.socket = new WebSocket(this.api);

    this.subscribe();
    this.setupPing();
  }

  close() {
    if (!this.socket) {
      throw new Error('No Socket');
    }

    this.socket.close(1000, 'Chat closed');
    clearInterval(this.pingInterval!);
    this.pingInterval = null;
  }

  subscribe() {
    this.socket.addEventListener('open', () => {
      this.send({
        content: '0',
        type: 'get old',
      });
    });
    this.socket.addEventListener('close', () => {
      console.log('closed');
    });
    this.socket.addEventListener('error', () => {
      console.log('error');
    });
    this.socket.addEventListener('message', (event) => {
      this.get(event);
    });
  }

  send(data: DataType) {
    if (!this.socket) {
      throw new Error('No Socket');
    }

    this.socket.send(JSON.stringify(data));
  }

  get(event: MessageEvent) {
    try {
      const data = JSON.parse(event.data);

      if (!data || ['pong', 'user connected'].includes(data.type)) {
        return;
      }
      console.log(data);

      let dataToStore = data;

      // временное решение для нового сообщения ??
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

  setupPing() {
    this.pingInterval = setInterval(() => {
      this.send({ type: 'ping' });
    }, 30000);
  }
}
