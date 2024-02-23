import Button from '../button/button.ts';
import Input from '../input/input.ts';
import LogInForm from './logInForm.ts';

// to rename

export default new LogInForm({
  nameInput: new Input({
    name: 'login',
    text: 'Login',
    regExpString: '^(?=.*[A-Za-z])[-_A-Za-z0-9]{3,20}$',
    attr: { class: 'input-wrapper ' },
  }),
  passInput: new Input({
    name: 'password',
    text: 'Password',
    type: 'password',
    regExpString: '^(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,40}$',
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
