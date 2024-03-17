import EventBus from './event-bus';

type DataType = { [key: string]: Record<string, string> | FormData | string };

export default class WSTransport extends EventBus {
  private static __instance: WSTransport;

  api: string;

  socket: WebSocket;

  pingInterval: ReturnType<typeof setInterval> | null;

  constructor(api: string) {
    if (WSTransport.__instance) {
      // eslint-disable-next-line no-constructor-return
      return WSTransport.__instance;
    }

    super();

    WSTransport.__instance = this;

    this.api = api;
    console.log(this.api);
  }

  connect() {
    console.log(this.socket);

    if (this.socket) {
      throw new Error('Socket is alredy created');
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
      console.log('connected');

      this.send({ content: '12345', type: 'message' });
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
    } catch (error) {}
  }

  setupPing() {
    this.pingInterval = setInterval(() => {
      this.send({ type: 'ping' });
    }, 30000);
  }
}
