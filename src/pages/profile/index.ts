import passwordForm from '../../components/passwordForm/index.ts';
import profile from '../../components/profile/index.ts';
import profileForm from '../../components/profileForm/index.ts';
import ReturnButton from '../../components/returnButton/returnButton.ts';
import userPic from '../../components/userPic/index.ts';
import ProfilePage from './profile.ts';

export default new ProfilePage({
  returnBtn: new ReturnButton({
    attr: { class: 'btn-return-wrapper', title: 'Step back' },
    events: {},
  }),
  userPic,

  profile,
  profileForm,
  passwordForm,

  userName: 'UserName',
  attr: { class: 'main main--profile' },
});
