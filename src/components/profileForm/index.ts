import Button from '../button/button.ts';
import FormInput from '../inputs/formInput.ts';
import ProfileForm from './profileForm.ts';

export default new ProfileForm({
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
  displayNameInput: new FormInput({
    name: 'display_name',
    text: 'Username',
    regExpString: '^(?=.*[A-Za-z])[-_A-Za-z0-9]{3,20}$',
    attr: { class: 'input-wrapper' },
  }),
  phoneInput: new FormInput({
    name: 'phone',
    text: 'Phone',
    type: 'phone',
    regExpString: '^\\+?\\d{10,15}$',
    attr: { class: 'input-wrapper' },
  }),

  submitBtn: new Button({
    text: 'Save changes',
    attr: { class: 'btn', type: 'submit' },
  }),
  attr: {
    class: 'form form--profile form--profile-change hidden',
    title: 'Change profile',
  },
});
