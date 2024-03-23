import Block from '../core/block.ts';

export default class Route {
  _block: Block | null;

  _pathname;

  _blockClass;

  rootId;

  constructor(pathname: string, view: Block, rootId: string) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this.rootId = rootId;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  // Скрывает текущий блок при переходе
  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  // Сравнивает текущий путь с путем маршрута
  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    // Создает новый экземпляр блока, если он еще не создан

    if (!this._block) {
      this._block = this._blockClass;

      // Отрисовывает блок
      const rootEl = document.getElementById(this.rootId) as HTMLElement;

      rootEl.append(this._block.getContent());

      return;
    }

    // Показывает блок, если он уже создан
    this._block.show();
  }
}
