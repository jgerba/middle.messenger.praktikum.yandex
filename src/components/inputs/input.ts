import tpl from './input.hbs?raw';
import Block, { PropsType } from '../../core/block.js';

export default class Input extends Block {
  constructor(tagName: string, props: PropsType) {
    super(tagName, props);
  }

  render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }
}

