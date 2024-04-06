import tpl from './fileModal.hbs?raw';
import Block from '../../../core/block.ts';
import Modal from '../modal.ts';

import { PropsType, ChildrenType } from '../../../core/types.ts';

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
    const input = this.element!.querySelector('input')!;

    if (!input.value) {
      console.log('Wrong input');
      return;
    }

    const fileName = input.files![0].name;
    const label = this.element!.querySelector('label')!;
    label.innerText = fileName;
  }

  protected submitHandler(event: SubmitEvent) {
    super.submitHandler(event);

    const inputFiles: FileList = (event.target as HTMLFormElement).avatar.files;

    if (inputFiles.length === 0) {
      console.log('No files');
      return;
    }

    this.fetchHandler(inputFiles);
  }

  protected async fetchHandler(inputFiles: FileList) {
    console.log(inputFiles);
  }
}
