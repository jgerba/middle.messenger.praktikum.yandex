import AuthPage from './pages/auth/auth.ts';
import './styles/style.scss';

const rootEl = document.getElementById('app') as HTMLDivElement;
const authPage = new AuthPage({});

if (rootEl) {
    rootEl.append(authPage.getContent() as HTMLElement);
}

