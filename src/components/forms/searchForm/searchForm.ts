import tpl from './searchForm.hbs?raw';
import Block from '../../../core/block.ts';

import { PropsType, ChildrenType, IndexedType } from '../../../core/types.ts';
import store from '../../../core/store.ts';

export default class SearchForm extends Block {
  filterBadge: Block;

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

  render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }

  submitSearch(event: SubmitEvent) {
    event.preventDefault();
    const searchString = (event.target as HTMLFormElement).search.value.trim();

    if (!searchString) {
      console.log('Empty search string');
      return;
    }

    console.log(`Searching ${searchString}`);
  }

  handleInput(event: InputEvent) {
    this.handleIcon(event);

    const filterVal = (event.target as HTMLInputElement).value.trim();
    store.setState('chatsFilter', { filterVal });

    this.handleBadge();
  }

  handleIcon(event: Event) {
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

  initBadge() {
    this.filterBadge = this.children.clearBtn as Block;
    this.filterBadge.addEvent('click', this.resetFilterHandler.bind(this));

    this.handleBadge();
  }

  resetFilterHandler() {
    (this.element! as HTMLFormElement).reset();
    store.clearStatePath('chatsFilter');
    this.handleBadge();
  }

  handleBadge() {
    const state = store.getState();
    const filterVal = (state.chatsFilter as IndexedType)?.filterVal as string;

    filterVal ? this.filterBadge.show() : this.filterBadge.hide();
  }
}
