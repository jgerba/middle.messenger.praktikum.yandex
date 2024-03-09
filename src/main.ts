import chatPage from './pages/messenger/index.ts';

import signUp from './pages/signUp/index.ts';
import signIn from './pages/signIn/index.ts';
import profilePage from './pages/settings/index.ts';
// import ErrorPage from './pages/error/error.ts';
import './styles/style.scss';
import Router from './core/Router.ts';

// const rootEl = document.getElementById('app') as HTMLElement;

// const location = window.location.pathname;

// const pages: { [key: string]: HTMLElement } = {
//   '/': authPage.getContent() as HTMLElement,
//   '/chatpage': chatPage.getContent() as HTMLElement,
//   '/profile': profilePage.getContent() as HTMLElement,
//   '/error': new ErrorPage({
//     attr: { class: 'main main-error-page' },
//   }).getContent() as HTMLElement,
// };

// if (pages[location]) {
//   rootEl.append(pages[location]);
// } else {
//   rootEl.append(
//     new ErrorPage({
//       notFound: true,
//       attr: { class: 'main main-error-page' },
//     }).getContent() as HTMLElement,
//   );
// }

const router = new Router();
router.use('/', signIn);
router.use('/sign-up', signUp);
router.use('/messenger', chatPage);
router.use('/settings', profilePage);
router.start();

export default router;
