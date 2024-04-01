import SearchForm from './searchForm.ts';
import connect from '../../../core/connect.ts';

import Button from '../../button/button.ts';
import searchIcon from './svg/search.svg';
import { IndexedType, PropsType } from '../../../core/types.ts';

function getBtnText(state: IndexedType): PropsType {
  const filterVal = (state?.chatsFilter as IndexedType)?.filterVal as string;

  return { text: `Filter: ${filterVal}` };
}

const ConnectedBtn = connect(Button, getBtnText);

export default new SearchForm({
  searchIcon,
  clearBtn: new ConnectedBtn('button', {
    attr: {
      class: 'search-form__filter-badge hidden',
      type: 'button',
      title: 'Clear filter',
    },
    events: {},
  }),
  attr: { class: 'search-form' },
});
