import tpl from './signUp.hbs?raw';
import Block from '../../core/block.js';

import { PropsType, ChildrenType } from '../../core/types.ts';

export default class SignUpPage extends Block {
  constructor(props: PropsType | ChildrenType) {
    super('div', props);
  }

  protected render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }
}
