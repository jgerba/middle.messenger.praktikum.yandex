import tpl from './chatHeader.hbs?raw';
import Block, { PropsType, ChildrenType } from '../../core/block.ts';

export default class ChatHeader extends Block {
  constructor(tagName: string, props: PropsType | ChildrenType) {
    super(tagName, props);
  }

  render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }
}
