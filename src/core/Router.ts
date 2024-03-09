import Route from './Route.ts';
import Block from './block.ts';

export default class Router {
  // eslint-disable-next-line no-use-before-define
  private static __instance: Router;

  routes: Route[];

  history;

  _currentRoute: Route | null;

  rootId;

  constructor(rootId: string = 'appRoot') {
    if (Router.__instance) {
      // eslint-disable-next-line no-constructor-return
      return Router.__instance; // Реализация паттерна "Singleton"
    }

    this.routes = []; // Список маршрутов
    this.history = window.history; // Интерфейс для работы с историей браузера
    this._currentRoute = null; // Текущий активный маршрут
    this.rootId = rootId; // Селектор корневого элемента для отрисовки

    Router.__instance = this; // Сохранение экземпляра Router
  }

  // Метод для добавления маршрута
  use(pathname: string, block: Block) {
    const route = new Route(pathname, block, this.rootId!);

    this.routes.push(route);
    return this; // Возврат экземпляра Router для цепочечного вызова
  }

  // Метод для запуска Router и отслеживания изменений URL
  start() {
    window.onpopstate = (event: PopStateEvent) => {
      this._onRoute((event.currentTarget as Window).location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  // Внутренний метод для обработки перехода на новый маршрут
  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    // Вызов leave у текущего маршрута
    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    // Отрисовка нового маршрута
    // route.render(route, pathname); ???
    route.render();
  }

  // Метод для перехода на указанный маршрут
  go(pathname: string) {
    this.history!.pushState({}, pathname, pathname);
    this._onRoute(pathname); // Обработка перехода
  }

  // Метод для возврата на предыдущий маршрут
  back() {
    this.history!.back();
  }

  // Метод для перехода на следующий маршрут
  forward() {
    this.history!.forward();
  }

  // Вспомогательный метод для получения маршрута по указанному пути
  getRoute(pathname: string): Route | undefined {
    return this.routes.find((route) => route.match(pathname));
  }
}
