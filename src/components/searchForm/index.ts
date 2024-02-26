import SearchForm from './searchForm.ts';
import searchSvg from './svg/search.svg';

export default new SearchForm({
  src: searchSvg,
  attr: { class: 'search-form' },
});
