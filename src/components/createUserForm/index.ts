import Button from '../button/button.ts';
import FormInput from '../inputs/formInput.ts';
import CreateUserForm from './createUserForm.ts';

export default new CreateUserForm({
  emailInput: new FormInput({
    name: 'email',
    text: 'Email',
    type: 'email',
    regExpString: '^[a-zA-Z0-9._-]+@[a-zA-Z]+\\.[a-zA-Z]{2,}$',
    attr: { class: 'input-wrapper' },
  }),
  loginInput: new FormInput({
    name: 'login',
    text: 'Login',
    regExpString: '^(?=.*[A-Za-z])[-_A-Za-z0-9]{3,20}$',
    attr: { class: 'input-wrapper' },
  }),
  nameInput: new FormInput({
    name: 'first_name',
    text: 'Name',
    regExpString: '^[A-ZА-Я][a-zа-я-]+$',
    attr: { class: 'input-wrapper' },
  }),
  surnameInput: new FormInput({
    name: 'second_name',
    text: 'Surname',
    regExpString: '^[A-ZА-Я][a-zа-я-]+$',
    attr: { class: 'input-wrapper' },
  }),
  phoneInput: new FormInput({
    name: 'phone',
    text: 'Phone',
    type: 'phone',
    regExpString: '^\\+?\\d{10,15}$',
    attr: { class: 'input-wrapper' },
  }),
  passInput: new FormInput({
    name: 'password',
    text: 'Password',
    type: 'password',
    regExpString: '^(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,40}$',
    attr: { class: 'input-wrapper' },
  }),
  confirmPassInput: new FormInput({
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
