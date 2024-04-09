import tpl from './avatarInput.hbs?raw';
import Block from '../../core/block.js';

export default class AvatarInput extends Block {
  protected render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }
}
