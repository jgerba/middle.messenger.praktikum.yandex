import tpl from './button.hbs?raw';
import Block, { PropsType } from '../../core/block.js';

export default class Button extends Block {
  constructor(props: PropsType) {
    super('button', props);
  }

  render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }
}
