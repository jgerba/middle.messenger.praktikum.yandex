import Route from './route.ts';
import Block from '../core/block.ts';

export default class Router {
  // eslint-disable-next-line no-use-before-define
  private static __instance: Router;

  // routes list
  routes: Route[] = [];

  // browser history interface
  history = window.history;

  _currentRoute: Route | null;

  rootId;

  constructor(rootId: string = 'app-root') {
    if (Router.__instance) {
      // eslint-disable-next-line no-constructor-return
      return Router.__instance; // singltone realisation
    }

    // save Router instance
    Router.__instance = this;

    // current active route
    this._currentRoute = null;
    // root el for render
    this.rootId = rootId;
  }

  // add route method
  use(pathname: string, block: Block) {
    const route = new Route(pathname, block, this.rootId!);

    this.routes.push(route);

    // возврат экземпляра Router для цепочечного вызова
    return this;
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
    this.history!.pushState({}, pathname, pathname);

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
