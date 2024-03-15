import UserPic from './userPic.ts';
import fallbackImg from './svg/fallback-img.svg';
import connect from '../../core/connect.ts';
import findValueByKey from '../../utils/findValueByKey.ts';

type IndexedType = {
  [key: string]: string | number | IndexedType;
};

function getAvatarImg(state: IndexedType): IndexedType {
  const avatarImg = findValueByKey(state, 'avatar');

  return {
    avatarImg: `https://ya-praktikum.tech/api/v2/resources${
      avatarImg || fallbackImg
    }`,
  };
}

const ConnectedUserPic = connect(UserPic, getAvatarImg);

export default new ConnectedUserPic('div', {
  attr: { class: 'userpic', title: 'User picture' },
});
