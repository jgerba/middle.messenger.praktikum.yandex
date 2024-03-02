import tpl from './userModal.hbs?raw';
import { ChildrenType, PropsType } from '../../../core/block.js';
import Modal from '../modal.js';

export default class UserModal extends Modal {
  constructor(props: PropsType | ChildrenType) {
    super(props);
  }

  render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }
}
