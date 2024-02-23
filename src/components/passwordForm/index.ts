import Button from '../button/button.ts';
import Input from '../input/input.ts';
import UserPic from '../userPic/userPic.ts';
import PasswordForm from './passwordForm.ts';

export default new PasswordForm({
    userPic: new UserPic({
        attr: { class: 'userpic' },
    }),
    oldPassInput: new Input({
        name: 'oldPassword',
        text: 'Old password',
        type: 'password',
        attr: { class: 'input-wrapper' },
    }),
    newPassInput: new Input({
        name: 'password',
        text: 'New password',
        type: 'password',
        regExpString: '^(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,40}$',
        attr: { class: 'input-wrapper' },
    }),
    confirmPassInput: new Input({
        name: 'password-confirm',
        text: 'Confirm password',
        type: 'password',
        regExpString: '^(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,40}$',
        attr: { class: 'input-wrapper' },
    }),

    submitBtn: new Button({
        text: 'Save changes',
        attr: { class: 'btn', type: 'submit' },
    }),
    attr: {
        class: 'form form--profile hidden form--profile-password',
        title: 'Change password',
    },
});

