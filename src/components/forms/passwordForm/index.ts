import Button from '../../button/button.ts';
import FormInput from '../../inputs/formInput.ts';
import Input from '../../inputs/input.ts';
import PasswordForm from './passwordForm.ts';

export default new PasswordForm({
  oldPassInput: new Input('div', {
    name: 'oldPassword',
    text: 'Old password',
    type: 'password',
    autocomplete: 'current-password',
    attr: { class: 'input-wrapper' },
  }),
  newPassInput: new FormInput('div', {
    name: 'newPassword',
    text: 'New password',
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
    text: 'Save changes',
    attr: { class: 'btn', type: 'submit' },
  }),
  attr: {
    class: 'form form--settings hidden form--settings-password',
    title: 'Change password',
  },
});
