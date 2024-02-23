import chatPage from './pages/chat/index.ts';
import authPage from './pages/auth/index.ts';
import profilePage from './pages/profile/index.ts';
import ErrorPage from './pages/error/error.ts';
import './styles/style.scss';

const rootEl = document.getElementById('app') as HTMLElement;

const location = window.location.pathname;

const pages: { [key: string]: HTMLElement } = {
  '/': authPage.getContent() as HTMLElement,
  '/chatpage': chatPage.getContent() as HTMLElement,
  '/profile': profilePage.getContent() as HTMLElement,
  '/error': new ErrorPage({}).getContent() as HTMLElement,
};

if (pages[location]) {
  rootEl.append(pages[location]);
} else {
  rootEl.append(new ErrorPage({ notFound: true }).getContent() as HTMLElement);
}

