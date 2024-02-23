import tpl from './button.hbs?raw';
import Block, { PropsType } from '../../core/block.js';

export default class Button extends Block {
  constructor(props: PropsType) {
    super('button', props);
  }

  render(): DocumentFragment {
    // remove events data from props
    // iife - destructure props from argument, return rest (no unused vars)
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }
}
