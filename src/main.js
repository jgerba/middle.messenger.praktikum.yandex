import './styles/style.scss';

import * as components from './components/index.js';

import Auth from './pages/auth/index.js';
import Settings from './pages/settings/index.js';

import { handleTemplates } from './utils/tplHelper.js';

handleTemplates(components);
const rootEl = document.getElementById('app');

rootEl.innerHTML = Settings({ showModal: true });
