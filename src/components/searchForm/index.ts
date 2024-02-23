import Input from '../input/input.ts';
import SearchForm from './searchForm.ts';
import searchSvg from './svg/search.svg';

export default new SearchForm({
    name: 'search',
    type: 'search',
    text: 'Search',

    src: searchSvg,
    attr: { class: 'search-form' },
});
