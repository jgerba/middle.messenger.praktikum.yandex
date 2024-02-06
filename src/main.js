import './styles/style.scss';

import * as components from './components/index.js';
import * as pages from './pages/index.js';

import { handlePartials, handlePages } from './utils/tplHelper.js';

handlePartials(components);
const rootEl = document.getElementById('app');
const pagesRoutes = handlePages(pages);
const location = window.location.pathname;

const pagesContext = {
    // show upload avatar modal
    // '/profile': { showModal: true },
    // show change pass form
    // '/changeprofile': { changePass: true },
    // show login page
    // '/authpage': { login: true },
    // show 404 page
    // '/errorpage': { notFound: true },
};

if (location === '/') {
    rootEl.innerHTML = pagesRoutes['/authpage']({ login: true });
} else if (pagesRoutes[location]) {
    rootEl.innerHTML = pagesRoutes[location](
        pagesContext[pagesRoutes[location]]
    );
} else {
    rootEl.innerHTML = pagesRoutes['/errorpage']({ notFound: true });
}
