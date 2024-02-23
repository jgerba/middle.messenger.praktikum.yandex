import messageDropdown from './components/messageDropdown';

import './styles/style.scss';

const rootEl = document.getElementById('app') as HTMLElement;

if (rootEl) {
    rootEl.append(messageDropdown.getContent() as HTMLElement);
}

