import AvatarInput from './avatarInput.ts';
import connect from '../../core/connect.ts';
import { BASE_URL } from '../../core/const.ts';

import fallbackImg from '../../static/svg/fallback-img.svg';
import { PropsType } from '../../core/block.ts';

type IndexedType = {
  [key: string]: string | number | IndexedType;
};

function getAvatarImg(state: IndexedType): PropsType {
  const chat = state.currentChat as IndexedType | undefined;

  return {
    avatarImg: chat?.avatar
      ? `${BASE_URL}/resources/${chat.avatar}`
      : fallbackImg,
  };
}

const ConnectedUserPic = connect(AvatarInput, getAvatarImg);

export default new ConnectedUserPic('div', {
  attr: { class: 'avatar-pic chatpic', title: 'Chat picture' },
});
