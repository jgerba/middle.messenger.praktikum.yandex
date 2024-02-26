import tpl from './userPic.hbs?raw';
import Block, { PropsType } from '../../core/block.js';

export default class UserPic extends Block {
  constructor(props: PropsType) {
    const onClick = () => this.clickFileInput.bind(this)();

    super('div', { ...props, events: { click: onClick } });
  }

  render(): DocumentFragment {
    // remove events data from props
    // iife - destructure props from argument, return rest (no unused vars)
    // const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, this.props);
  }

  clickFileInput() {
    const fileInput = this.element!.querySelector('input') as HTMLInputElement;
    fileInput.click();
  }
}
