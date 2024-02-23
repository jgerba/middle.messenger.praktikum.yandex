import Button from '../button/button.ts';
import Input from '../input/input.ts';
import UserPic from '../userPic/userPic.ts';
import ProfileForm from './profileForm.ts';

export default new ProfileForm({
    userPic: new UserPic({
        attr: { class: 'userpic' },
    }),

    emailInput: new Input({
        name: 'email',
        text: 'Email',
        type: 'email',
        regExpString: '^[a-zA-Z0-9._-]+@[a-zA-Z]+\\.[a-zA-Z]{2,}$',
        attr: { class: 'input-wrapper' },
    }),
    loginInput: new Input({
        name: 'login',
        text: 'Login',
        regExpString: '^(?=.*[A-Za-z])[-_A-Za-z0-9]{3,20}$',
        attr: { class: 'input-wrapper' },
    }),
    nameInput: new Input({
        name: 'first_name',
        text: 'Name',
        regExpString: '^[A-ZА-Я][a-zа-я-]+$',
        attr: { class: 'input-wrapper' },
    }),
    surnameInput: new Input({
        name: 'second_name',
        text: 'Surname',
        regExpString: '^[A-ZА-Я][a-zа-я-]+$',
        attr: { class: 'input-wrapper' },
    }),
    displayNameInput: new Input({
        name: 'display_name',
        text: 'Username',
        regExpString: '^(?=.*[A-Za-z])[-_A-Za-z0-9]{3,20}$',
        attr: { class: 'input-wrapper' },
    }),
    phoneInput: new Input({
        name: 'phone',
        text: 'Phone',
        type: 'phone',
        regExpString: '^\\+?\\d{10,15}$',
        attr: { class: 'input-wrapper' },
    }),

    submitBtn: new Button({
        text: 'Save changes',
        attr: { class: 'btn', type: 'submit' },
    }),
    attr: { class: 'form form--profile hidden', title: 'Change profile' },
});
