import Router from './core/Router.ts';
import authController from './controllers/auth-controller.ts';

import signUpPage from './pages/signUp/index.ts';
import signInPage from './pages/signIn/index.ts';

import './styles/style.scss';

const router = new Router();
router.use('/', signInPage);
router.use('/sign-up', signUpPage);
router.start();

await authController.getUser();

export default router;
