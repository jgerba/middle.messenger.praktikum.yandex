import SignUpPage from './signUp.ts';
import signUpForm from '../../components/forms/signUpForm/index.ts';

export default new SignUpPage({
  signUpForm,
  attr: { class: 'main' },
});
