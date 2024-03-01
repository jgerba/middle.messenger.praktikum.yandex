import AuthPage from './auth.ts';
import logInForm from '../../components/forms/logInForm/index.ts';
import createUserForm from '../../components/forms/createUserForm/index.ts';

export default new AuthPage({
  logInForm,
  createUserForm,
  attr: { class: 'main' },
});
