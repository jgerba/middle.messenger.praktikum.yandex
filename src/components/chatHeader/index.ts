import ChatHeader from './chatHeader.ts';
import connect from '../../core/connect.ts';
import findValueByKey from '../../utils/findValueByKey.ts';

import headerDropdown from '../dropdowns/headerDropdown/index.ts';
import fallbackImg from '../../static/svg/fallback-img.svg';

type IndexedType = {
  [key: string]: string | number | IndexedType;
};

function getHeadData(state: IndexedType): IndexedType {
  if (state.currentChat) {
    let avatar = findValueByKey(
      state.currentChat as { [key: string]: string },
      'avatar',
    );
    let title = findValueByKey(
      state.currentChat as { [key: string]: string },
      'title',
    )!;

    return {
      avatar: avatar
        ? `https://ya-praktikum.tech/api/v2/resources/${avatar}`
        : fallbackImg,
      title,
    };
  }

  return {
    avatar: '',
    title: '',
  };
}

const connectedChatHead = connect(ChatHeader, getHeadData);

export default new connectedChatHead('header', {
  headerDropdown,
  attr: { class: 'chat-header' },
});
