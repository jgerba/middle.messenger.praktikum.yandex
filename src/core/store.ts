import EventBus from './event-bus.ts';

import setObjectValue from '../utils/setObjectValue.ts';
import Router from './Router.ts';

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

  router: Router;

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

  public clearCurrentChat() {
    delete this.state.currentChat;
  }

  private updateState(path: string, value: unknown) {
    this.state = setObjectValue(this.state, path, value);

    this.emit(StoreEvents.Updated);
  }

  private updateStorage() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const localState = (({ currentChat, ...rest }) => rest)(this.state);

    localStorage.setItem('My store', JSON.stringify(localState));
  }

  public setRouter(router: Router) {
    this.router = router;
  }

  public getRouter() {
    return this.router;
  }
}

export default new Store();
