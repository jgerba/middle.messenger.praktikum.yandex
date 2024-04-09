import tpl from './username.hbs?raw';
import Block from '../../core/block.js';

export default class Username extends Block {
  protected render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }
}
