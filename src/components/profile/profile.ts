import tpl from './profile.hbs?raw';
import Block, { PropsType, ChildrenType } from '../../core/block.ts';

export default class Profile extends Block {
  constructor(props: PropsType | ChildrenType) {
    super('section', props);
  }

  render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }
}
