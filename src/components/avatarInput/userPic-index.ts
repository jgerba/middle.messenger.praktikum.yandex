import AvatarInput from './avatarInput.ts';
import connect from '../../core/connect.ts';

import fallbackImg from '../../static/svg/fallback-img.svg';

import { BASE_URL } from '../../core/const.ts';
import { PropsType, IndexedType } from '../../core/types.ts';

function getAvatarImg(state: IndexedType): PropsType {
  const user = state.user as IndexedType;

  return {
    avatarImg:
      user && (user.avatar as string)
        ? `${BASE_URL}/resources/${user.avatar}`
        : fallbackImg,
  };
}

const ConnectedUserPic = connect(AvatarInput, getAvatarImg);

export default new ConnectedUserPic('div', {
  attr: { class: 'avatar-pic userpic', title: 'User picture' },
});
