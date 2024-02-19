import SignUpForm from './signUpForm.ts';
import Button from '../button/button.ts';
import Input from '../input/input.ts';

const emailInput = new Input({
    name: 'email',
    text: 'Email',
    type: 'email',
});
const loginInput = new Input({
    name: 'login',
    text: 'Login',
});
const nameInput = new Input({
    name: 'first_name',
    text: 'Name',
});
const surnameInput = new Input({
    name: 'second_name',
    text: 'Surname',
});
const phoneInput = new Input({
    name: 'phone',
    text: 'Phone',
    type: 'phone',
});
const passInput = new Input({
    name: 'password',
    text: 'Password',
    type: 'password',
});
const confirmPassInput = new Input({
    name: 'password-confirm',
    text: 'Confirm password',
    type: 'password',
});

const submitBtn = new Button({
    submit: true,
    text: 'Create account',
    events: {
        submit: (event: Event) => {
            console.log(event);
        },
    },
});
const signInBtn = new Button({
    ['extra-btn']: true,
    text: 'Sign in',
    events: {
        click: (event: Event) => {
            console.log(event);
        },
    },
});

const signUpForm = new SignUpForm({
    emailInput,
    loginInput,
    nameInput,
    surnameInput,
    phoneInput,
    passInput,
    confirmPassInput,
    submitBtn,
    signInBtn,
});

export default signUpForm;
