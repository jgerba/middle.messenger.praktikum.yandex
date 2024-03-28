import Router from './router/router.ts';
import authController from './controllers/auth-controller.ts';
import store from './core/store.ts';

import signUpPage from './pages/signUp/index.ts';
import signInPage from './pages/signIn/index.ts';
import error from './pages/error/index.ts';

import './styles/style.scss';

class App {
  router: Router;

  constructor() {
    this.initRouter();
    this.checkAuth();
  }

  initRouter() {
    this.router = new Router();
    this.router.use('/', signInPage);
    this.router.use('/sign-up', signUpPage);
    this.router.use('/404', error);
    this.router.start();

    store.setRouter(this.router);
  }

  async checkAuth() {
    await authController.getUser();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line no-new
  new App();
});
