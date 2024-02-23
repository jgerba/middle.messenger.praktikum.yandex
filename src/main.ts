import chatPage from './pages/chat/index.ts';
import './styles/style.scss';

const rootEl = document.getElementById('app') as HTMLElement;

if (rootEl) {
    rootEl.append(chatPage.getContent() as HTMLElement);
}

