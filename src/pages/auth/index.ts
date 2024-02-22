import AuthPage from './auth';
import logInForm from '../../components/logInForm/index';
import createUserForm from '../../components/createUserForm/index';

export default new AuthPage({
    logInForm,
    createUserForm,
    attr: { class: 'main' },
});

