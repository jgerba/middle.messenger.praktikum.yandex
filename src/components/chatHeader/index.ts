import ChatHeader from './chatHeader.ts';
import connect from '../../core/connect.ts';
import { BASE_URL } from '../../core/const.ts';

import findValueByKey from '../../utils/findValueByKey.ts';

import headerDropdown from '../dropdowns/headerDropdown/index.ts';
import fallbackImg from '../../static/svg/fallback-img.svg';
import { PropValue, PropsType } from '../../core/block.ts';
import chatPic from '../avatarInput/chatPic-index.ts';

type IndexedType = {
  [key: string]: string | number | IndexedType;
};

function getHeadData(state: IndexedType): PropsType {
  const avatar = findValueByKey(
    state.currentChat as { [key: string]: string },
    'avatar',
  );
  const title = findValueByKey(
    state.currentChat as { [key: string]: string },
    'title',
  )! as PropValue;

  return {
    avatar: avatar ? `${BASE_URL}/resources/${avatar}` : fallbackImg,
    title,
    // eslint-disable-next-line no-unneeded-ternary
    isInChat: state.currentChat ? true : false,
  };
}

const ConnectedChatHead = connect(ChatHeader, getHeadData);

export default new ConnectedChatHead('header', {
  chatPic,
  headerDropdown,
  attr: { class: 'chat-header' },
});
