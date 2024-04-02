import EventBus from './event-bus.ts';
import Router from '../router/router.ts';

import isEqual from '../utils/isEqual.ts';
import setObjectValue from '../utils/setObjectValue.ts';
import { IndexedType } from './types.ts';

type StateMethodType = (path: string, value: unknown) => void;

/* eslint-disable no-shadow */
export enum StoreEvents {
  Updated = 'updated',
}

/* eslint no-use-before-define:0 */
class Store extends EventBus {
  private static _instance: Store;

  private _state: IndexedType = {};

  private _router: Router;

  constructor() {
    if (Store._instance) {
      // eslint-disable-next-line no-constructor-return
      return Store._instance;
    }

    super();

    Store._instance = this;

    const initState = localStorage.getItem('My store');
    if (initState) {
      this._state = JSON.parse(initState);
    }

    this.on(StoreEvents.Updated, this.updateStorage.bind(this));
  }

  public getState() {
    // return findValueByKey(this._state, key);
    return this._state;
  }

  public setState: StateMethodType = (path, value) => {
    const statesAreEqual = isEqual(
      this._state[path] as IndexedType,
      value as IndexedType,
    );

    if (!statesAreEqual) {
      this.updateState(path, value);
    }
  };

  public clearState() {
    this._state = {};
    localStorage.clear();
  }

  public clearStatePath(path: string) {
    delete this._state[path];
    this.emit(StoreEvents.Updated);
  }

  private updateState: StateMethodType = (path, value) => {
    this._state = setObjectValue(this._state, path, value);

    this.emit(StoreEvents.Updated);
  };

  private updateStorage() {
    // while adding new chat - chatsReviews rerender cancel
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const localState = (({ currentChat, newChat, ...rest }) => rest)(
      this._state,
    );

    localStorage.setItem('My store', JSON.stringify(localState));
  }

  public setRouter(router: Router) {
    this._router = router;
  }

  public getRouter() {
    return this._router;
  }
}

export default new Store();
