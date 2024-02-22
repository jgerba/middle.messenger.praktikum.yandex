import Button from '../button/button.ts';
import ProfileField from '../profileField/profileField.ts';
import Profile from './profile.ts';

export default new Profile({
    emailField: new ProfileField({
        header: 'Email',
        text: 'email@email.ru',
        attr: { class: 'profile-field' },
    }),
    loginField: new ProfileField({
        header: 'Login',
        text: 'Some login',
        attr: { class: 'profile-field' },
    }),
    nameField: new ProfileField({
        header: 'Name',
        text: 'Some name',
        attr: { class: 'profile-field' },
    }),
    surnameField: new ProfileField({
        header: 'Surname',
        text: 'Some surname',
        attr: { class: 'profile-field' },
    }),
    phoneField: new ProfileField({
        header: 'Phone',
        text: '111-111-11',
        attr: { class: 'profile-field' },
    }),

    changeProfileBtn: new Button({
        text: 'Change profile',
        attr: { class: 'btn btn--extra form--profile__btn', type: 'button' },
    }),
    changePassBtn: new Button({
        text: 'Change password',
        attr: { class: 'btn btn--extra form--profile__btn', type: 'button' },
    }),
    logOutBtn: new Button({
        text: 'Change password',
        attr: { class: 'btn btn--warning form--profile__btn', type: 'button' },
    }),
    attr: { class: 'form form--profile' },
});
