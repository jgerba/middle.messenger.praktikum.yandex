import EventBus from './event-bus.ts';

import setObjectValue from '../utils/setObjectValue.ts';

type IndexedType = {
  [key: string]: string | number | IndexedType;
};

/* eslint-disable no-shadow */
export enum StoreEvents {
  Updated = 'updated',
}

/* eslint no-use-before-define:0 */
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

    this.on(StoreEvents.Updated, this.updateStorage.bind(this));
  }

  public getState() {
    // return findValueByKey(this.state, key);
    return this.state;
  }

  public setState(path: string, value: unknown) {
    this.updateState(path, value);
  }

  public clearState() {
    this.state = {};
    localStorage.clear();
  }

  private updateState(path: string, value: unknown) {
    this.state = setObjectValue(this.state, path, value);

    this.emit(StoreEvents.Updated);
  }

  private updateStorage() {
    localStorage.setItem('My store', JSON.stringify(this.state));
  }
}

export default new Store();
