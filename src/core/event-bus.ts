export default class EventBus {
  /* eslint @typescript-eslint/ban-types:0 */
  listeners: { [eventName: string]: CallableFunction[] };

  constructor() {
    this.listeners = {};
  }

  on(eventName: string, callback: (...args: unknown[]) => void): void {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    this.listeners[eventName].push(callback);
  }

  off(eventName: string, callback: (...args: unknown[]) => void): void {
    if (!this.listeners[eventName]) {
      throw new Error(`Нет события: ${eventName}`);
    }

    this.listeners[eventName] = this.listeners[eventName].filter(
      (listener) => listener !== callback,
    );
  }

  emit(eventName: string, ...args: unknown[]): void {
    if (!this.listeners[eventName]) {
      throw new Error(`Нет события: ${eventName}`);
    }

    this.listeners[eventName].forEach((listener) => {
      listener(...args);
    });
  }
}
