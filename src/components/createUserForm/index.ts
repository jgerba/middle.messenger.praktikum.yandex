import Button from '../button/button.ts';
import Input from '../input/input.ts';
import CreateUserForm from './createUserForm.ts';

export default new CreateUserForm({
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
  phoneInput: new Input({
    name: 'phone',
    text: 'Phone',
    type: 'phone',
    regExpString: '^\\+?\\d{10,15}$',
    attr: { class: 'input-wrapper' },
  }),
  passInput: new Input({
    name: 'password',
    text: 'Password',
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
    text: 'Enter',
    attr: { class: 'btn', type: 'submit' },
  }),
  logInBtn: new Button({
    text: 'Log in',
    attr: { class: 'btn btn--extra', type: 'button' },
    events: {},
  }),
  attr: { class: 'form form--signUp hidden' },
});

