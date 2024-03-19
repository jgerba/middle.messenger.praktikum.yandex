type CallbackType = (...args: unknown[]) => void;
type EventType = (eventName: string, callback: CallbackType) => void;
type EmitType = (eventName: string, ...args: unknown[]) => void;

export default class EventBus {
  /* eslint @typescript-eslint/ban-types:0 */
  listeners: { [eventName: string]: CallableFunction[] };

  constructor() {
    this.listeners = {};
  }

  on: EventType = (eventName, callback) => {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    this.listeners[eventName].push(callback);
  };

  off: EventType = (eventName, callback) => {
    if (!this.listeners[eventName]) {
      throw new Error(`Нет события: ${eventName}`);
    }

    this.listeners[eventName] = this.listeners[eventName].filter(
      (listener) => listener !== callback,
    );
  };

  emit: EmitType = (eventName, ...args) => {
    if (!this.listeners[eventName]) {
      throw new Error(`Нет события: ${eventName}`);
    }

    this.listeners[eventName].forEach((listener) => {
      listener(...args);
    });
  };
}
