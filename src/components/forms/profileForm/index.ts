import ProfileForm from './profileForm.ts';

import Button from '../../button/button.ts';
import FormInput from '../../inputs/formInput.ts';

import store from '../../../core/store.ts';

type IndexedType = {
  [key: string]: string | number | IndexedType;
};

const user = store.getState().user as IndexedType;

export default new ProfileForm({
  emailInput: new FormInput({
    name: 'email',
    text: 'Email',
    type: 'email',
    value: user.email as string,
    regExpString: '^[a-zA-Z0-9._-]+@[a-zA-Z]+\\.[a-zA-Z]{2,}$',
    attr: { class: 'input-wrapper' },
  }),
  loginInput: new FormInput({
    name: 'login',
    text: 'Login',
    value: user.login as string,
    regExpString: '^(?=.*[A-Za-z])[-_A-Za-z0-9]{3,20}$',
    attr: { class: 'input-wrapper' },
  }),
  nameInput: new FormInput({
    name: 'first_name',
    text: 'Name',
    value: user.first_name as string,
    regExpString: '^[A-ZА-Я][a-zа-я-]+$',
    attr: { class: 'input-wrapper' },
  }),
  surnameInput: new FormInput({
    name: 'second_name',
    text: 'Surname',
    value: user.second_name as string,
    regExpString: '^[A-ZА-Я][a-zа-я-]+$',
    attr: { class: 'input-wrapper' },
  }),
  displayNameInput: new FormInput({
    name: 'display_name',
    text: 'Username',
    value: user.display_name as string,
    regExpString: '^(?=.*[A-Za-z])[-_A-Za-z0-9]{3,20}$',
    attr: { class: 'input-wrapper' },
  }),
  phoneInput: new FormInput({
    name: 'phone',
    text: 'Phone',
    type: 'phone',
    value: user.phone as string,
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
