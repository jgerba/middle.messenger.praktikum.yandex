import './styles/style.scss';

import * as components from './components/index.js';
import * as pages from './pages/index.js';

import { handlePartials, handlePages } from './utils/tplHelper.js';

// register & render partials
handlePartials(components);

// compile pages & adjust pages routes
const pagesRoutes = handlePages(pages);

const rootEl = document.getElementById('app');

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

window.addEventListener('DOMContentLoaded', function () {
    const location = window.location.pathname;

    console.log(pagesRoutes);
    console.log(location);

    if (location === '/') {
        rootEl.innerHTML = pagesRoutes['/authpage']();
    } else if (pagesRoutes[location]) {
        rootEl.innerHTML = pagesRoutes[location](
            pagesContext[pagesRoutes[location]]
        );
    } else {
        rootEl.innerHTML = pagesRoutes['/errorpage']({ notFound: true });
    }
});
