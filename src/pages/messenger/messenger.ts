import tpl from './messenger.hbs?raw';
import Block from '../../core/block.ts';

import { PropsType, ChildrenType } from '../../core/types.ts';

/* eslint no-use-before-define:0 */
/* eslint prefer-template:0 */

export default class Messenger extends Block {
  constructor(props: PropsType | ChildrenType) {
    super('div', props);
  }

  render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }
}
