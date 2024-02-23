import tpl from './searchForm.hbs?raw';
import Block, { PropsType, ChildrenType } from '../../core/block.ts';

export default class SearchForm extends Block {
  constructor(props: PropsType | ChildrenType) {
    super('form', props);

    this.addEvents();
  }

  render(): DocumentFragment {
    // remove events data from props
    // iife - destructure props from argument, return rest (no unused vars)
    // const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, this.props);
  }

  addEvents() {
    const searchInput = (this.element as HTMLFormElement).search;

    searchInput.addEventListener(
      'focusin',
      this.handleIcon.bind(this, searchInput),
    );
    searchInput.addEventListener(
      'focusout',
      this.handleIcon.bind(this, searchInput),
    );

    this.element?.addEventListener('submit', (event) =>
      this.submitSearch(event, searchInput),
    );
  }

  submitSearch(event: Event, searchInput: HTMLInputElement) {
    /* eslint class-methods-use-this: 0 */

    event.preventDefault();
    const searchString = searchInput.value.trim();

    if (!searchString) {
      /* eslint no-console: 0 */

      console.log('Empty search string');
      return;
    }

    console.log(`Searching ${searchString}`);
  }

  handleIcon(searchInput: HTMLInputElement) {
    const icon = this.element?.querySelector('img');

    if (icon?.classList.contains('hidden') && searchInput.value.trim()) {
      return;
    }
    icon?.classList.toggle('hidden');
  }
}

