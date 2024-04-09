import tpl from './fileModal.hbs?raw';
import Block from '../../../core/block.ts';
import Modal from '../modal.ts';

import store from '../../../core/store.ts';
import { PropsType, ChildrenType } from '../../../core/types.ts';
import { MODAL_HEAD, POP_MSG } from '../../../core/const.ts';

export default class FileModal extends Modal {
  constructor(props: PropsType | ChildrenType) {
    super(props);

    this.initFileInput();
  }

  protected render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }

  private initFileInput() {
    (this.children.fileInput as Block).addEvent(
      'change',
      this.changeLabelHandler.bind(this),
    );
  }

  private changeLabelHandler() {
    const input = this.element!.querySelector('input') as HTMLInputElement;
    const header = this.element!.querySelector('.modal__header') as HTMLElement;
    const label = this.element!.querySelector(
      '.upload-label',
    ) as HTMLLabelElement;

    header.classList.remove('modal__header--upload-fail');
    label.classList.remove('upload-label--upload-success');

    if (!input.value) {
      header.innerText = MODAL_HEAD.FAIL;
      header.classList.add('modal__header--upload-fail');
      return;
    }

    const fileName = input.files![0].name;

    label.innerText = fileName;
    label.classList.add('upload-label--upload-success');
    header.innerText = MODAL_HEAD.SUCCESS;
  }

  protected submitHandler(event: SubmitEvent) {
    super.submitHandler(event);

    const inputFiles: FileList = (event.target as HTMLFormElement).avatar.files;

    if (inputFiles.length === 0) {
      store.setState('popUp', { message: POP_MSG.FILES_EMPTY, isError: true });
      return;
    }

    this.fetchHandler(inputFiles);
  }

  protected async fetchHandler(inputFiles: FileList) {
    console.log(inputFiles);
  }
}
