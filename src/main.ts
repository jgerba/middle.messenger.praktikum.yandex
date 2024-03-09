import Router from './core/Router.ts';

import messenger from './pages/messenger/index.ts';
import signUpPage from './pages/signUp/index.ts';
import signInPage from './pages/signIn/index.ts';
import settings from './pages/settings/index.ts';

import './styles/style.scss';

const router = new Router();
router.use('/', signInPage);
router.use('/sign-up', signUpPage);
router.use('/messenger', messenger);
router.use('/settings', settings);
router.start();

export default router;
