import Route from './route.ts';
import Block from '../core/block.ts';

export default class Router {
  // eslint-disable-next-line no-use-before-define
  private static __instance: Router;

  // routes list
  private _routes: Route[] = [];

  // browser history interface
  private _history = window.history;

  private _currentRoute: Route | null;

  private _rootId;

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
    this._rootId = rootId;
  }

  // add route method
  public use(pathname: string, block: Block) {
    const route = new Route(pathname, block, this._rootId!);

    this._routes.push(route);

    // возврат экземпляра Router для цепочечного вызова
    return this;
  }

  // start Router & handle URL changes
  public start() {
    window.onpopstate = (event: PopStateEvent) => {
      this._onRoute((event.currentTarget as Window).location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  // inner method for route handle
  private _onRoute(pathname: string) {
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
  public go(pathname: string) {
    this._history!.pushState({}, pathname, pathname);

    // handle routing
    this._onRoute(pathname);
  }

  // return prev route handler
  public back() {
    this._history!.back();
  }

  // forw route handler
  public forward() {
    this._history!.forward();
  }

  // вспомогательный метод для получения маршрута по указанному пути ??
  public getRoute(pathname: string): Route | undefined {
    return this._routes.find((route) => route.match(pathname));
  }
}
