import './styles/style.scss';

import Button from './components/button/index.js';

const rootEl = document.getElementById('app');

rootEl.innerHTML = Button({ text: 123, class: 'btn2', submit: true });
