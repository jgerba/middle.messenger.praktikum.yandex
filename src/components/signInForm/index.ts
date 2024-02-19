import SignInForm from './signInForm.ts';
import Button from '../button/button.ts';
import Input from '../input/input.ts';

const nameInput = new Input({ name: 'login', text: 'Login' });
const passInput = new Input({
    name: 'password',
    text: 'Password',
    type: 'password',
});

const submitBtn = new Button({
    submit: true,
    text: 'Enter',
    events: {
        submit: (event: Event) => {
            console.log(event);
        },
    },
});
const signUpBtn = new Button({
    ['extra-btn']: true,
    text: 'Sign up',
    events: {
        click: (event: Event) => {
            console.log(event);
        },
    },
});

const signInForm = new SignInForm({
    NameInput: nameInput,
    PassInput: passInput,
    SubmitBtn: submitBtn,
    SignUpBtn: signUpBtn,
});

export default signInForm;
