import tpl from './chat.hbs?raw';
import Block, { PropsType, ChildrenType } from '../../core/block.js';

export default class ChatPage extends Block {
  constructor(props: PropsType | ChildrenType) {
    super('main', props);

    this.addEvents();
  }

  render(): DocumentFragment {
    // remove events data from props
    const propsToRender = (({ attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }

  addEvents() {}
}
