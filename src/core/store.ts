import EventBus from './event-bus';

import findValueByKey from '../utils/findValueByKey';
import setObjectValue from '../utils/setObjectValue';

type IndexedType = {
  [key: string]: string | number | IndexedType;
};

export enum StoreEvents {
  Updated = 'updated',
}

class Store extends EventBus {
  private static __instance: Store;
  private state: IndexedType = {};
  eventBus: EventBus;

  constructor() {
    if (Store.__instance) {
      // eslint-disable-next-line no-constructor-return
      return Store.__instance;
    }

    super();

    Store.__instance = this;

    const initState = localStorage.getItem('My store');
    if (initState) {
      this.state = JSON.parse(initState);
    }

    this.__registerEvents();
  }

  private __registerEvents() {
    this.on(StoreEvents.Updated, this.updateStorage.bind(this));
  }

  public getState(key: string) {
    return findValueByKey(this.state, key);
  }

  public setState(path: string, value: unknown) {
    this.updateStore(path, value);
  }

  public clearStore() {
    this.state = {};
    this.updateStorage(); // or through emit?
  }

  private updateStore(path: string, value: unknown) {
    this.state = setObjectValue(this.state, path, value);
    this.emit(StoreEvents.Updated);
  }

  private updateStorage() {
    localStorage.setItem('My store', JSON.stringify(this.state));
  }
}

export default new Store();
