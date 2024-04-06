import AvatarInput from './avatarInput.ts';
import connect from '../../core/connect.ts';
import { BASE_URL } from '../../core/const.ts';

import fallbackImg from '../../static/svg/fallback-img.svg';
import ChatImageModal from '../modals/fileModal/chatImageModal.ts';
import Input from '../inputs/input.ts';
import Button from '../button/button.ts';

import { PropsType, IndexedType } from '../../core/types.ts';

function getAvatarImg(state: IndexedType): PropsType {
  const chat = state.currentChat as IndexedType | undefined;

  return {
    avatarImg: chat?.avatar
      ? `${BASE_URL}/resources/${chat.avatar}`
      : fallbackImg,
  };
}

function openModal() {
  /* eslint no-new: 0 */

  new ChatImageModal({
    fileInput: new Input('div', {
      name: 'avatar',
      text: 'Choose image on PC',
      upload: true,
      type: 'file',
      attr: { class: 'input-wrapper', title: 'Add image' },
      events: {},
    }),
    submitBtn: new Button('button', {
      text: 'Change',
      attr: { class: 'btn', type: 'submit' },
    }),

    attr: { class: 'modal' },
    events: {},
  });
}

const ConnectedUserPic = connect(AvatarInput, getAvatarImg);

export default new ConnectedUserPic('div', {
  attr: { class: 'avatar-pic chatpic', title: 'Chat picture' },
  events: { click: openModal },
});
