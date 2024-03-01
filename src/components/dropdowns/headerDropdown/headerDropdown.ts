import tpl from './headerDropdown.hbs?raw';
import { PropsType, ChildrenType } from '../../../core/block.ts';
import Dropdown from '../dropdown.ts';

export default class HeaderDropdown extends Dropdown {
  constructor(props: PropsType | ChildrenType) {
    super(props);

    this.initOpenDropBtn();
  }

  render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }
}
