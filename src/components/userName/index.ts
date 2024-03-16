import UserPic from './username.ts';
import connect from '../../core/connect.ts';
import findValueByKey from '../../utils/findValueByKey.ts';

type IndexedType = {
  [key: string]: string | number | IndexedType;
};

function getUsername(state: IndexedType): IndexedType {
  const userName = findValueByKey(state, 'display_name');

  return {
    userName: userName || 'Username',
  };
}

const ConnectedUsername = connect(UserPic, getUsername);

export default new ConnectedUsername('h2', {
  attr: { class: 'header', title: 'Username' },
});
