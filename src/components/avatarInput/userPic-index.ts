import AvatarInput from './avatarInput.ts';
import connect from '../../core/connect.ts';

import fallbackImg from '../../static/svg/fallback-img.svg';
import AvatarModal from '../modals/fileModal/avatarModal.ts';
import Input from '../inputs/input.ts';
import Button from '../button/button.ts';

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

function openModal() {
  /* eslint no-new: 0 */

  new AvatarModal({
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
  attr: { class: 'avatar-pic userpic', title: 'User picture' },
  events: { click: openModal },
});
