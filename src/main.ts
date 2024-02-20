import AuthPage from './pages/auth/auth.ts';
import './styles/style.scss';

const rootEl = document.getElementById('app') as HTMLElement;
const authPage = new AuthPage({ isLogIn: true, rootEl: rootEl });

if (rootEl) {
    rootEl.append(authPage.getContent() as HTMLElement);
}

