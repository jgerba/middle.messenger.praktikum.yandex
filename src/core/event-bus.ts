export default class EventBus {
    listeners: { [eventName: string]: Function[] };

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
            listener => listener !== callback
        );
    }

    emit(eventName: string, ...args: unknown[]): void {
        if (!this.listeners[eventName]) {
            throw new Error(`Нет события: ${eventName}`);
        }

        this.listeners[eventName].forEach(function (listener) {
            listener(...args);
        });
    }
}
