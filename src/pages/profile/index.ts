import passwordForm from '../../components/passwordForm/index';
import profile from '../../components/profile/index';
import profileForm from '../../components/profileForm/index';
import ReturnButton from '../../components/returnButton/returnButton';
import UserPic from '../../components/userPic/userPic';
import ProfilePage from './profile';

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
