import tpl from './error.hbs?raw';
import Block, { PropsType, ChildrenType } from '../../core/block.js';

export default class ErrorPage extends Block {
  constructor(props: PropsType | ChildrenType) {
    super('div', props);
  }

  render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }
}
