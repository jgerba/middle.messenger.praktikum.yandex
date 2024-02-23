import tpl from './chat.hbs?raw';
import Block, { PropsType, ChildrenType } from '../../core/block.js';

export default class ChatPage extends Block {
  constructor(props: PropsType | ChildrenType) {
    super('main', props);
  }

  render(): DocumentFragment {
    // remove events data from props
    // iife - destructure props from argument, return rest (no unused vars)
    // const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, this.props);
  }
}

