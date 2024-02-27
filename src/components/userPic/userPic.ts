import tpl from './userPic.hbs?raw';
import Block, { PropsType } from '../../core/block.js';

export default class UserPic extends Block {
  constructor(props: PropsType) {
    const onClick = () => this.clickFileInput.bind(this)();

    super('div', { ...props, events: { click: onClick } });
  }

  render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }

  clickFileInput() {
    const fileInput = this.element!.querySelector('input') as HTMLInputElement;
    fileInput.click();
  }
}
