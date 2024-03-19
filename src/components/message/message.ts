import tpl from './message.hbs?raw';
import Block, { PropsType } from '../../core/block.js';

export default class Message extends Block {
  constructor(props: PropsType) {
    super('article', props);
  }

  render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }
}
