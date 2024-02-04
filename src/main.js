import './styles/style.scss';

import * as components from './components/index.js';

import Auth from './pages/auth/index.js';

import { handleTpls } from './utils/tplHelper.js';

handleTpls(components);
const rootEl = document.getElementById('app');

rootEl.innerHTML = Auth();
