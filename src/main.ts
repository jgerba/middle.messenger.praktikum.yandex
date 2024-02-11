import './styles/style.scss';

import * as components from './components/index.js';
import * as pages from './pages/index.js';

import { handlePartials, handlePages } from './utils/tplHelper.js';

// register & render partials
handlePartials(components);

// compile pages & adjust pages routes
const pagesRoutes = handlePages(pages);

const rootEl: HTMLElement | null = document.getElementById('app');

// context to test pages
const pagesContext: { [key: string]: { [key: string]: boolean } } = {
    // show upload avatar modal
    // '/profile': { showModal: true },
    // show change pass form
    // '/changeprofile': { changePass: true },
    // show login page
    // '/authpage': { login: true },
    // show 404 page
    // '/errorpage': { notFound: true },
};

const location: string = window.location.pathname;

if (rootEl) {
    if (location === '/') {
        rootEl.innerHTML = pagesRoutes['/authpage']({ login: true });
    } else if (pagesRoutes[location]) {
        rootEl.innerHTML = pagesRoutes[location](pagesContext[location]);
    } else {
        rootEl.innerHTML = pagesRoutes['/errorpage']({ notFound: true });
    }
}
