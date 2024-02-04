import './styles/style.scss';

import * as components from './components/index.js';
import * as pages from './pages/index.js';

import { handlePartials, handlePages } from './utils/tplHelper.js';

handlePartials(components);
const rootEl = document.getElementById('app');
const pagesRoutes = handlePages(pages);

const pagesContext = {
    // show upload avatar modal
    // '/settings': { showModal: true },
    // show login page
    // '/authpage': { login: true },
    // show 404 page
    // '/errorpage': { notFound: true },
};

if (window.location.pathname === '/') {
    rootEl.innerHTML = 'dummy';
} else {
    rootEl.innerHTML = pagesRoutes[window.location.pathname](
        pagesContext[window.location.pathname]
    );
}
