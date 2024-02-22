import Button from '../button/button.ts';
import Input from '../input/input.ts';
import LogInForm from './logInForm.ts';

export default new LogInForm({
    nameInput: new Input({
        name: 'login',
        text: 'Login',
        attr: { class: 'input-wrapper ' },
    }),
    passInput: new Input({
        name: 'password',
        text: 'Password',
        type: 'password',
        attr: { class: 'input-wrapper' },
    }),

    submitBtn: new Button({
        text: 'Enter',
        attr: { class: 'btn', type: 'submit' },
    }),
    createUserBtn: new Button({
        text: 'Sign up',
        attr: { class: 'btn btn--extra', type: 'button' },
    }),
    attr: { class: 'form' },
});

