import Route from './route.ts';
import Block from '../core/block.ts';

export default class Router {
  // eslint-disable-next-line no-use-before-define
  private static __instance: Router;

  routes: Route[];

  history;

  _currentRoute: Route | null;

  rootId;

  constructor(rootId: string = 'app-root') {
    if (Router.__instance) {
      // eslint-disable-next-line no-constructor-return
      return Router.__instance; // singltone realisation
    }

    // save Router instance
    Router.__instance = this;

    this.routes = []; // routes list
    this.history = window.history; // browser history interface
    this._currentRoute = null; // current active route
    this.rootId = rootId; // root el for render
  }

  // add route method
  use(pathname: string, block: Block) {
    const route = new Route(pathname, block, this.rootId!);

    this.routes.push(route);

    return this; // возврат экземпляра Router для цепочечного вызова ??
  }

  // start Router & handle URL changes
  start() {
    window.onpopstate = (event: PopStateEvent) => {
      this._onRoute((event.currentTarget as Window).location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  // inner method for route handle
  _onRoute(pathname: string) {
    let route = this.getRoute(pathname);

    if (!route) {
      route = this.getRoute('/404')!;
    }

    // leave current route
    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    // render route
    route.render();
  }

  // go to new selected route
  go(pathname: string) {
    console.log('history', pathname);
    console.log('history2', window.history);

    this.history!.pushState({}, pathname, pathname);
    console.log('history3', this.history);

    this._onRoute(pathname); // handle routing
  }

  // return prev route handler
  back() {
    this.history!.back();
  }

  // forw route handler
  forward() {
    this.history!.forward();
  }

  // вспомогательный метод для получения маршрута по указанному пути ??
  getRoute(pathname: string): Route | undefined {
    return this.routes.find((route) => route.match(pathname));
  }
}

