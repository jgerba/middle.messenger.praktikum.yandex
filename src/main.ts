import './style.scss';

import Handlebars from 'handlebars';

import { Button } from './components/button';

Handlebars.registerPartial('Button', Button);

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <button>!!!</button>
  </div>
`;
