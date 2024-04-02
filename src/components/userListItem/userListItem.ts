import tpl from './userListItem.hbs?raw';
import Block from '../../core/block.js';
import { ChildrenType, PropsType } from '../../core/types.js';

export default class UserListItem extends Block {
  constructor(props: PropsType | ChildrenType) {
    super('li', props);
  }

  protected render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }
}
