import UserPic from './userPic.ts';
import fallbackImg from './svg/fallback-img.svg';

export default new UserPic({
  img: fallbackImg,
  attr: { class: 'userpic', title: 'User picture' },
});
