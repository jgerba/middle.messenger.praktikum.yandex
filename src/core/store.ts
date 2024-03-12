import EventBus from './event-bus';
import setObjectValue from '../utils/setObjectValue';

type IndexedType = {
  [key: string]: string | number | IndexedType;
};

export enum StoreEvents {
  Updated = 'updated',
}

class Store {
  private state: IndexedType = {};
  eventBus: EventBus;

  constructor() {
    this.eventBus = new EventBus();
    this._registerEvents(this.eventBus);
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(StoreEvents.Updated, this._updateHandler.bind(this));
  }

  public get getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    this.updateStore(path, value);
  }

  private updateStore(path: string, value: unknown) {
    this.state = setObjectValue(this.state, path, value);
    this.eventBus.emit(StoreEvents.Updated);
  }

  private _updateHandler() {
    console.log('Store updated', this.state);
  }
}

export default new Store();
