import tpl from './chatPreview.hbs?raw';
import Block, { PropsType } from '../../core/block.js';

export default class ChatPreview extends Block {
  constructor(props: PropsType) {
    super('article', props);
  }

  render(): DocumentFragment {
    // remove events data from props
    // iife - destructure props from argument, return rest (no unused vars)
    // const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, this.props);
  }
}
