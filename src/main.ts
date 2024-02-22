import passwordForm from './components/passwordForm/index.ts';
import profileForm from './components/profileForm/index.ts';

import authPage from './pages/auth/index.ts';
import './styles/style.scss';

const rootEl = document.getElementById('app') as HTMLElement;

if (rootEl) {
    rootEl.append(passwordForm.getContent() as HTMLElement);
}

