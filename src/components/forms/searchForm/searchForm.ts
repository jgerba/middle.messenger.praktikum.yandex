import tpl from './searchForm.hbs?raw';
import Block, { PropsType, ChildrenType } from '../../../core/block.ts';

export default class SearchForm extends Block {
  constructor(props: PropsType | ChildrenType) {
    const onTouch = (event: Event) => this.handleIcon.bind(this)(event);
    const onSubmit = (event: SubmitEvent) =>
      this.submitSearch.bind(this)(event);

    super('form', {
      ...props,
      events: { focusin: onTouch, input: onTouch, submit: onSubmit },
    });
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
}
