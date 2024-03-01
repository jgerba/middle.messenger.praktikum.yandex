import passwordForm from '../../components/forms/passwordForm/index.ts';
import profile from '../../components/profile/index.ts';
import profileForm from '../../components/forms/profileForm/index.ts';
import returnBtn from '../../components/returnButton/index.ts';
import userPic from '../../components/userPic/index.ts';
import ProfilePage from './profile.ts';

export default new ProfilePage({
  returnBtn,
  userPic,

  profile,
  profileForm,
  passwordForm,

  userName: 'UserName',
  attr: { class: 'main main--profile' },
});
