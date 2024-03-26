import Button from '../../button/button.ts';
import FormInput from '../../inputs/formInput.ts';
import SignInForm from './signInForm.ts';

export default new SignInForm({
  nameInput: new FormInput('div', {
    name: 'login',
    text: 'Login',
    regExpString: '^(?=.*[A-Za-z])[-_A-Za-z0-9]{3,20}$',
    attr: { class: 'input-wrapper ' },
  }),
  passInput: new FormInput('div', {
    name: 'password',
    text: 'Password',
    type: 'password',
    regExpString: '^(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,40}$',
    attr: { class: 'input-wrapper' },
  }),

  submitBtn: new Button('button', {
    text: 'Enter',
    attr: { class: 'btn', type: 'submit' },
  }),
  signUpBtn: new Button('button', {
    text: 'Sign up',
    attr: { class: 'btn btn--extra', type: 'button' },
    events: {},
  }),
  attr: { class: 'form' },
});
