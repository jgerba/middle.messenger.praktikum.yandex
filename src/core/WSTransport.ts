import EventBus from './event-bus';
import store from './store';

type DataType = { [key: string]: Record<string, string> | FormData | string };

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

  get(message: MessageEvent) {
    try {
      const data = JSON.parse(message.data);

      if (!data || ['pong', 'user connected'].includes(data.type)) {
        return;
      }

      console.log(data);

      store.setState('currentChat', { messages: data });
    } catch (error) {}
  }

  setupPing() {
    this.pingInterval = setInterval(() => {
      this.send({ type: 'ping' });
    }, 30000);
  }
}
