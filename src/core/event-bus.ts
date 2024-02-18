export default class EventBus {
    listeners: { [eventName: string]: ((...args: any) => void)[] };

    constructor() {
        this.listeners = {};
    }

    on(eventName: string, callback: (...args: any) => void): void {
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }

        this.listeners[eventName].push(callback);
    }

    off(eventName: string, callback: (...args: any) => void): void {
        if (!this.listeners[eventName]) {
            throw new Error(`Нет события: ${eventName}`);
        }

        if (this.listeners[eventName]) {
            this.listeners[eventName] = this.listeners[eventName].filter(
                listener => listener !== callback
            );
        }
    }

    emit(eventName: string, ...args: any): void {
        if (!this.listeners[eventName]) {
            throw new Error(`Нет события: ${eventName}`);
        }

        this.listeners[eventName].forEach(function (listener) {
            listener(...args);
        });
    }
}
