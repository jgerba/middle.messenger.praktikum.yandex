import ProfileForm from './profileForm.ts';
import connect from '../../../core/connect.ts';

import Button from '../../button/button.ts';
import FormInput from '../../inputs/formInput.ts';

import { PropsType, IndexedType } from '../../../core/types.ts';

function getDefaultVal(state: IndexedType, type: string): PropsType {
  const user = state.user as IndexedType;

  return {
    value: user && (user[type] as string) ? (user[type] as string) : '',
  };
}

function createNewInput(type: string, props: PropsType) {
  const ConnectedInput = connect(FormInput, (state) =>
    getDefaultVal(state, type),
  );

  return new ConnectedInput('div', props);
}

export default new ProfileForm({
  emailInput: createNewInput('email', {
    name: 'email',
    text: 'Email',
    type: 'email',
    autocomplete: 'email',
    regExpString: '^[a-zA-Z0-9._-]+@[a-zA-Z]+\\.[a-zA-Z]{2,}$',
    isShiftedToSides: true,
    attr: { class: 'input-wrapper' },
  }),
  loginInput: createNewInput('login', {
    name: 'login',
    text: 'Login',
    autocomplete: 'username',
    regExpString: '^(?=.*[A-Za-z])[-_A-Za-z0-9]{3,20}$',
    isShiftedToSides: true,
    attr: { class: 'input-wrapper' },
  }),
  nameInput: createNewInput('first_name', {
    name: 'first_name',
    text: 'Name',
    autocomplete: 'given-name',
    regExpString: '^[A-ZА-Я][a-zа-я-]+$',
    isShiftedToSides: true,
    attr: { class: 'input-wrapper' },
  }),
  surnameInput: createNewInput('second_name', {
    name: 'second_name',
    text: 'Surname',
    autocomplete: 'family-name',
    regExpString: '^[A-ZА-Я][a-zа-я-]+$',
    isShiftedToSides: true,
    attr: { class: 'input-wrapper' },
  }),
  displayNameInput: createNewInput('display_name', {
    name: 'display_name',
    text: 'Username',
    autocomplete: 'username',
    regExpString: '^(?=.*[A-Za-z])[-_A-Za-z0-9]{3,20}$',
    isShiftedToSides: true,
    attr: { class: 'input-wrapper' },
  }),
  phoneInput: createNewInput('phone', {
    name: 'phone',
    text: 'Phone',
    type: 'phone',
    autocomplete: 'tel',
    regExpString: '^\\+?\\d{10,15}$',
    isShiftedToSides: true,
    attr: { class: 'input-wrapper' },
  }),

  submitBtn: new Button('button', {
    text: 'Save changes',
    attr: { class: 'btn', type: 'submit' },
  }),
  attr: {
    class: 'form form-settings form-settings-change hidden',
    title: 'Change profile',
  },
});
