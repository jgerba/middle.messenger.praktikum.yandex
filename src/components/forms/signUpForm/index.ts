import Button from '../../button/button.ts';
import FormInput from '../../inputs/formInput.ts';
import SignUpForm from './signUpForm.ts';

export default new SignUpForm({
  emailInput: new FormInput('div', {
    name: 'email',
    text: 'Email',
    type: 'email',
    autocomplete: 'email',
    regExpString: '^[a-zA-Z0-9._-]+@[a-zA-Z]+\\.[a-zA-Z]{2,}$',
    attr: { class: 'input-wrapper' },
  }),
  loginInput: new FormInput('div', {
    name: 'login',
    text: 'Login',
    autocomplete: 'username',
    regExpString: '^(?=.*[A-Za-z])[-_A-Za-z0-9]{3,20}$',
    attr: { class: 'input-wrapper' },
  }),
  nameInput: new FormInput('div', {
    name: 'first_name',
    text: 'Name',
    autocomplete: 'given-name',
    regExpString: '^[A-ZА-Я][a-zа-я-]+$',
    attr: { class: 'input-wrapper' },
  }),
  surnameInput: new FormInput('div', {
    name: 'second_name',
    text: 'Surname',
    autocomplete: 'family-name',
    regExpString: '^[A-ZА-Я][a-zа-я-]+$',
    attr: { class: 'input-wrapper' },
  }),
  phoneInput: new FormInput('div', {
    name: 'phone',
    text: 'Phone',
    type: 'phone',
    autocomplete: 'tel',
    regExpString: '^\\+?\\d{10,15}$',
    attr: { class: 'input-wrapper' },
  }),
  passInput: new FormInput('div', {
    name: 'newPassword',
    text: 'Password',
    type: 'password',
    autocomplete: 'new-password',
    regExpString: '^(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,40}$',
    attr: { class: 'input-wrapper' },
  }),
  confirmPassInput: new FormInput('div', {
    name: 'password-confirm',
    text: 'Confirm password',
    type: 'password',
    autocomplete: 'new-password',
    regExpString: '^(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,40}$',
    attr: { class: 'input-wrapper' },
  }),

  submitBtn: new Button('button', {
    text: 'Enter',
    attr: { class: 'btn', type: 'submit' },
  }),
  logInBtn: new Button('button', {
    text: 'Log in',
    attr: { class: 'btn btn--extra', type: 'button' },
    events: {},
  }),
  attr: { class: 'form form--signUp' },
});
