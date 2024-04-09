import passwordForm from '../../components/forms/passwordForm/index.ts';
import profile from '../../components/profile/index.ts';
import profileForm from '../../components/forms/profileForm/index.ts';
import returnBtn from '../../components/returnButton/index.ts';
import userPic from '../../components/avatarInput/userPic-index.ts';
import userName from '../../components/userName/index.ts';

import Settings from './settings.ts';

export default new Settings({
  returnBtn,
  userPic,
  userName,

  profile,
  profileForm,
  passwordForm,

  attr: { class: 'main main-settings' },
});
