import Button from '../button/button.ts';
import Input from '../input/input.ts';
import CreateUserForm from './createUserForm.ts';

export default new CreateUserForm({
    emailInput: new Input({
        name: 'email',
        text: 'Email',
        type: 'email',
        attr: { class: 'input-wrapper' },
    }),
    loginInput: new Input({
        name: 'login',
        text: 'Login',
        attr: { class: 'input-wrapper' },
    }),
    nameInput: new Input({
        name: 'first_name',
        text: 'Name',
        attr: { class: 'input-wrapper' },
    }),
    surnameInput: new Input({
        name: 'second_name',
        text: 'Surname',
        attr: { class: 'input-wrapper' },
    }),
    phoneInput: new Input({
        name: 'phone',
        text: 'Phone',
        type: 'phone',
        attr: { class: 'input-wrapper' },
    }),
    passInput: new Input({
        name: 'password',
        text: 'Password',
        type: 'password',
        attr: { class: 'input-wrapper' },
    }),
    confirmPassInput: new Input({
        name: 'password-confirm',
        text: 'Confirm password',
        type: 'password',
        attr: { class: 'input-wrapper' },
    }),

    submitBtn: new Button({
        text: 'Enter',
        attr: { class: 'btn', type: 'submit' },
    }),
    logInBtn: new Button({
        text: 'Log in',
        attr: { class: 'btn btn--extra' },
    }),
    attr: { class: 'form form--signUp' },
});
