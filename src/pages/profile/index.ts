import passwordForm from '../../components/passwordForm/index.ts';
import profile from '../../components/profile/index.ts';
import profileForm from '../../components/profileForm/index.ts';
import ReturnButton from '../../components/returnButton/returnButton.ts';
import UserPic from '../../components/userPic/userPic.ts';
import ProfilePage from './profile.ts';

export default new ProfilePage({
  returnBtn: new ReturnButton({
    attr: { class: 'btn-return-wrapper' },
  }),
  userPic: new UserPic({
    attr: { class: 'userpic' },
  }),

  profile,
  profileForm,
  passwordForm,

  userName: 'UserName',
  attr: { class: 'main main--profile' },
});

