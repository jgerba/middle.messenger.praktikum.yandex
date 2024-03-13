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
  private state: IndexedType = {};
  eventBus: EventBus;

  constructor() {
    super();

    const initState = localStorage.getItem('My store');
    if (initState) {
      this.state = JSON.parse(initState);
    }
  }

  public getState(key: string) {
    return findValueByKey(this.state, key);
  }

  public setState(path: string, value: unknown) {
    this.updateStore(path, value);
  }

  public clearStore() {
    this.state = {};
  }

  private updateStore(path: string, value: unknown) {
    this.state = setObjectValue(this.state, path, value);
    localStorage.setItem('My store', JSON.stringify(this.state));

    this.emit(StoreEvents.Updated);
  }
}

export default new Store();
