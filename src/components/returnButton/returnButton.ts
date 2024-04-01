import tpl from './returnButton.hbs?raw';
import Block from '../../core/block.js';

import { PropsType } from '../../core/types.ts';

export default class ReturnButton extends Block {
  constructor(props: PropsType) {
    super('div', props);
  }

  render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }
}
