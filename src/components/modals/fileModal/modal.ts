import tpl from './modal.hbs?raw';
import Block, { PropsType } from '../../../core/block.js';

export default class Modal extends Block {
  constructor(props: PropsType) {
    super('section', props);
  }

  render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }
}
