import UserPic from './userPic.ts';
import connect from '../../core/connect.ts';
import { BASE_URL } from '../../core/const.ts';

import findValueByKey from '../../utils/findValueByKey.ts';

import fallbackImg from '../../static/svg/fallback-img.svg';
import { PropValue, PropsType } from '../../core/block.ts';

type IndexedType = {
  [key: string]: string | number | IndexedType;
};

function getAvatarImg(state: IndexedType): PropsType {
  const avatarImg = findValueByKey(state, 'avatar') as PropValue;

  return {
    avatarImg: avatarImg ? `${BASE_URL}/resources/${avatarImg}` : fallbackImg,
  };
}

const ConnectedUserPic = connect(UserPic, getAvatarImg);

export default new ConnectedUserPic('div', {
  attr: { class: 'userpic', title: 'User picture' },
});
