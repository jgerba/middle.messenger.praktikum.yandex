import AuthPage from './auth';
import logInForm from '../../components/LogInForm/index';
import createUserForm from '../../components/createUserForm/index';

export default new AuthPage({
    isLogin: true,

    logInForm,
    createUserForm,
    attr: { class: 'main' },
});
