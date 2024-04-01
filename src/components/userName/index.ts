import UserPic from './username.ts';

import connect from '../../core/connect.ts';
import findValueByKey from '../../utils/findValueByKey.ts';
import { PropValue, PropsType, IndexedType } from '../../core/types.ts';

function getUsername(state: IndexedType): PropsType {
  const userName = findValueByKey(state, 'display_name') as PropValue;

  return {
    userName: userName || 'Username',
  };
}

const ConnectedUsername = connect(UserPic, getUsername);

export default new ConnectedUsername('h2', {
  attr: { class: 'header', title: 'Username' },
});
