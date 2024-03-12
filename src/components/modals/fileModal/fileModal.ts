import tpl from './fileModal.hbs?raw';
import Modal from '../modal.ts';
import Block, { PropsType, ChildrenType } from '../../../core/block.ts';
import UserController from '../../../controllers/user-controller.ts';

export default class FileModal extends Modal {
  constructor(props: PropsType | ChildrenType) {
    super(props);

    this.initFileInput();
  }

  render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }

  initFileInput() {
    (this.children.fileInput as Block).addEvent(
      'change',
      this.changeLabelHandler.bind(this),
    );
  }

  changeLabelHandler() {
    const input = this.element!.querySelector('input')!;

    if (!input.value) {
      console.log('Wrong input');
      return;
    }

    const fileName = input.files![0].name;
    const label = this.element!.querySelector('label')!;
    label.innerText = fileName;
  }

  submitHandler(event: SubmitEvent) {
    super.submitHandler(event);

    const inputFiles = (event.target as HTMLFormElement).avatar.files;

    if (inputFiles.length === 0) {
      console.log('No files');
      return;
    }

    const formData = new FormData();
    formData.append('avatar', inputFiles[0]);

    UserController.changeAvatar({ data: formData });
  }
}
