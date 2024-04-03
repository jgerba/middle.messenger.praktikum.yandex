import Router from './router/router.ts';
import authController from './controllers/auth-controller.ts';
import store, { StoreEvents } from './core/store.ts';

import signUpPage from './pages/signUp/index.ts';
import signInPage from './pages/signIn/index.ts';
import error from './pages/error/index.ts';
import PopUp from './components/popUp/popUp.ts';

import './styles/style.scss';
import { PopUpType } from './core/types.ts';

/* eslint no-new: 0 */

class App {
  public router: Router;

  private popUpRoot: HTMLElement;

  constructor() {
    this.popUpRoot = document.getElementById('popup-root')!;

    this.initRouter();
    this.initPopUp();
    this.checkAuth();

    store.on(StoreEvents.Updated, this.initPopUp.bind(this));
  }

  private initRouter() {
    this.router = new Router();
    this.router.use('/', signInPage);
    this.router.use('/sign-up', signUpPage);
    this.router.use('/404', error);
    this.router.start();

    store.setRouter(this.router);
  }

  private initPopUp() {
    const state = store.getState();
    const popUpData = state.popUp as PopUpType;

    if (!popUpData?.message) {
      return;
    }

    const newPopUpEl = this.popUpConstructor(popUpData);

    this.popUpRoot.prepend(newPopUpEl);

    store.clearStatePath('popUp');

    setTimeout(() => {
      this.closePopup(newPopUpEl);
    }, 3000);
  }

  private popUpConstructor(data: PopUpType) {
    const { message, isError } = data;

    return new PopUp({
      message,
      attr: { class: `pop-up${isError ? ' error' : ''}` },
      events: {
        click: (event) => {
          this.closePopup(event.currentTarget as HTMLElement);
        },
      },
    }).getContent();
  }

  private closePopup(popUpEl: HTMLElement) {
    popUpEl.remove();
  }

  private async checkAuth() {
    await authController.getUser();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App();
});
