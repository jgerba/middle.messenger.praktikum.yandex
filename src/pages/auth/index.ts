import AuthPage from './auth.ts';
import signInForm from '../../components/signInForm/index.ts';
import signUpForm from '../../components/signUpForm/index.ts';

const authPage = new AuthPage({ login: true, signInForm, signUpForm });

export default authPage;
