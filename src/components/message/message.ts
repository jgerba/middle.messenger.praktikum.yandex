import tpl from './message.hbs?raw';
import Block from '../../core/block.js';

import { PropsType } from '../../core/types.ts';

export default class Message extends Block {
  constructor(props: PropsType) {
    super('article', props);
  }

  protected render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }
}
