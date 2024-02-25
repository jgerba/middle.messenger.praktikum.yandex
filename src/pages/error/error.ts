import tpl from './error.hbs?raw';
import Block, { PropsType, ChildrenType } from '../../core/block.js';

export default class ErrorPage extends Block {
  constructor(props: PropsType | ChildrenType) {
    super('div', props);
  }

  render(): DocumentFragment {
    // remove events data from props
    // iife - destructure props from argument, return rest (no unused vars)
    // const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, this.props);
  }
}

