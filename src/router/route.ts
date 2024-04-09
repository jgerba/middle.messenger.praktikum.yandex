import Block from '../core/block.ts';

export default class Route {
  private _block: Block | null;

  private _pathname;

  private _blockClass;

  private _rootId;

  constructor(pathname: string, view: Block, rootId: string) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._rootId = rootId;
  }

  public navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  // Скрывает текущий блок при переходе
  public leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  // Сравнивает текущий путь с путем маршрута
  public match(pathname: string) {
    return pathname === this._pathname;
  }

  public render() {
    // Создает новый экземпляр блока, если он еще не создан

    if (!this._block) {
      this._block = this._blockClass;

      // Отрисовывает блок
      const rootEl = document.getElementById(this._rootId) as HTMLElement;

      rootEl.append(this._block.getContent());
    }

    // Показывает блок, если он уже создан
    this._block.show();
  }
}
