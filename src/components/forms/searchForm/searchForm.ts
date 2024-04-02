import tpl from './searchForm.hbs?raw';
import Block from '../../../core/block.ts';

import { PropsType, ChildrenType, IndexedType } from '../../../core/types.ts';
import store from '../../../core/store.ts';

export default class SearchForm extends Block {
  private _filterBadge: Block;

  constructor(props: PropsType | ChildrenType) {
    const onFocus = (event: Event) => this.handleIcon.bind(this)(event);
    const onInput = (event: Event) => this.handleInput.bind(this)(event);
    const onSubmit = (event: SubmitEvent) =>
      this.submitSearch.bind(this)(event);

    super('form', {
      ...props,
      events: { focusin: onFocus, input: onInput, submit: onSubmit },
    });

    this.initBadge();
  }

  protected render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }

  private submitSearch(event: SubmitEvent) {
    event.preventDefault();
    const searchString = (event.target as HTMLFormElement).search.value.trim();

    if (!searchString) {
      console.log('Empty search string');
      return;
    }

    (this.element! as HTMLFormElement).reset();
  }

  private handleInput(event: InputEvent) {
    this.handleIcon(event);

    const filterVal = (event.target as HTMLInputElement).value.trim();
    store.setState('chatsFilter', { filterVal });

    this.handleBadge();
  }

  private handleIcon(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    const icon = this.element!.querySelector('img');

    if (!icon!.classList.contains('hidden') && inputValue.trim()) {
      icon!.classList.add('hidden');
      return;
    }
    if (icon!.classList.contains('hidden') && inputValue.trim()) {
      return;
    }
    icon!.classList.remove('hidden');
  }

  private initBadge() {
    this._filterBadge = this.children.clearBtn as Block;
    this._filterBadge.addEvent('click', this.resetFilterHandler.bind(this));

    this.handleBadge();
  }

  private resetFilterHandler() {
    (this.element! as HTMLFormElement).reset();
    store.clearStatePath('chatsFilter');
    this.handleBadge();
  }

  private handleBadge() {
    const state = store.getState();
    const filterVal = (state.chatsFilter as IndexedType)?.filterVal as string;

    filterVal ? this._filterBadge.show() : this._filterBadge.hide();
  }
}
