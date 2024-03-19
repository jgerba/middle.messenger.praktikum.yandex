import SignInPage from './signIn.ts';
import signInForm from '../../components/forms/SignInForm/index.ts';

export default new SignInPage({
  signInForm,
  attr: { class: 'main' },
});
