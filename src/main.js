import './styles/style.scss';

import Button from './components/button/index.js';
import Input from './components/input/index.js';

const rootEl = document.getElementById('app');

rootEl.innerHTML = Button({ text: 123, class: 'btn2', submit: true });
rootEl.innerHTML = Input({
    name: 123,
    ['error-text']: 'error',
    notEmpty: false,
});
