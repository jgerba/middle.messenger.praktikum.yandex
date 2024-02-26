import UserPic from './userPic.ts';
import fallbackPic from './svg/pic_fallback.svg';

export default new UserPic({
  fallbackPic,
  attr: { class: 'userpic', title: 'User picture' },
});
