import './styles/style.scss';

import * as components from './components/index.js';
import * as pages from './pages/index.js';

import { handlePartials, handlePages } from './utils/tplHelper.js';

handlePartials(components);
const rootEl = document.getElementById('app');
const pagesRoutes = handlePages(pages);

window.location.pathname === '/'
    ? (rootEl.innerHTML = '')
    : (rootEl.innerHTML = pagesRoutes[window.location.pathname]());
