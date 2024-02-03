import './styles/style.scss';

import * as components from './components/index.js';

import SignIn from './pages/signIn/index.js';
import SignUp from './pages/signUp/index.js';

import { handleTpls } from './utils/tplHelper.js';

handleTpls(components);
const rootEl = document.getElementById('app');

rootEl.innerHTML = SignUp({});
