import AuthPage from './auth.ts';
import signInForm from '../../components/signInForm/index.ts';

const authPage = new AuthPage({ login: true, SignInForm: signInForm });

export default authPage;
