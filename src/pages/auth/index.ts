import AuthPage from './auth.ts';
import logInForm from '../../components/logInForm/index.ts';
import createUserForm from '../../components/createUserForm/index.ts';

export default new AuthPage({
  logInForm,
  createUserForm,
  attr: { class: 'main' },
});
