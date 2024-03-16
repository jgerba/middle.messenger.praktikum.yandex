import Router from './core/Router.ts';
import authController from './controllers/auth-controller.ts';

import signUpPage from './pages/signUp/index.ts';
import signInPage from './pages/signIn/index.ts';

import './styles/style.scss';

class App {
  appRouter: Router;

  constructor() {
    this.initRouter();
    this.checkAuth();
  }

  initRouter() {
    this.appRouter = new Router();
    this.router.use('/', signInPage);
    this.router.use('/sign-up', signUpPage);
    this.router.start();
  }

  async checkAuth() {
    await authController.getUser();
  }

  get router() {
    return this.appRouter;
  }
}

const app = new App();
export default app.router;
