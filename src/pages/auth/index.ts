import AuthPage from './auth.ts';
import authForm from '../../components/authForm/index.ts';
import createUserForm from '../../components/createUserForm/index.ts';

export default new AuthPage({
  authForm,
  createUserForm,
  attr: { class: 'main' },
});
