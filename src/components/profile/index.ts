import { PropValue, PropsType } from '../../core/block.ts';
import connect from '../../core/connect.ts';
import findValueByKey from '../../utils/findValueByKey.ts';
import Button from '../button/button.ts';
import ProfileField from '../profileField/profileField.ts';
import Profile from './profile.ts';

type IndexedType = {
  [key: string]: string | number | IndexedType;
};

function getFieldData(state: IndexedType, fieldType: string): PropsType {
  const stateValue = findValueByKey(state, fieldType) as PropValue;

  return {
    text: stateValue || '-',
  };
}

/* eslint-disable no-shadow */
function createNewConnectedField(fieldType: string, props: PropsType) {
  const ConnectedField = connect(ProfileField, (state) =>
    getFieldData(state, fieldType),
  ) as { new (tagName: string, props: PropsType): ProfileField };

  return new ConnectedField('div', props);
}

export default new Profile({
  emailField: createNewConnectedField('email', {
    header: 'Email',
    attr: { class: 'profile-field' },
  }),
  loginField: createNewConnectedField('login', {
    header: 'Login',
    attr: { class: 'profile-field' },
  }),
  nameField: createNewConnectedField('first_name', {
    header: 'Name',
    attr: { class: 'profile-field' },
  }),
  surnameField: createNewConnectedField('second_name', {
    header: 'Surname',
    attr: { class: 'profile-field' },
  }),
  phoneField: createNewConnectedField('phone', {
    header: 'Phone',
    attr: { class: 'profile-field' },
  }),

  changeProfileBtn: new Button({
    text: 'Change profile',
    attr: {
      class: 'btn btn--extra form--profile__btn',
      type: 'button',
      title: 'Change profile',
    },
    events: {},
  }),
  changePassBtn: new Button({
    text: 'Change password',
    attr: {
      class: 'btn btn--extra form--profile__btn',
      type: 'button',
      title: 'Change password',
    },
    events: {},
  }),
  logOutBtn: new Button({
    text: 'Log Out',
    attr: {
      class: 'btn form--profile__btn btn--warning ',
      type: 'button',
      title: 'Log out',
    },
    events: {},
  }),
  attr: { class: 'form form--profile', title: 'Profile' },
});
