import profile from './pages/profile';
import './styles/style.scss';

const rootEl = document.getElementById('app') as HTMLElement;

if (rootEl) {
    rootEl.append(profile.getContent() as HTMLElement);
}

