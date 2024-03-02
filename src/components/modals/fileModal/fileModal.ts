import tpl from './fileModal.hbs?raw';
import { ChildrenType, PropsType } from '../../../core/block.ts';
import Modal from '../modal.ts';

export default class FileModal extends Modal {
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
