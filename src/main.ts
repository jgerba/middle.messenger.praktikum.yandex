import authPage from './pages/auth/index.ts';
import './styles/style.scss';

const rootEl = document.getElementById('app') as HTMLElement;

if (rootEl) {
    rootEl.append(authPage.getContent() as HTMLElement);
}

