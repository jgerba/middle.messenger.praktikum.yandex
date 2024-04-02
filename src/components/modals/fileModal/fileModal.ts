import tpl from './fileModal.hbs?raw';
import Block from '../../../core/block.ts';
import Modal from '../modal.ts';

import store from '../../../core/store.ts';
import userController from '../../../controllers/user-controller.ts';
import chatsController from '../../../controllers/chats-controller.ts';

import { PropsType, ChildrenType } from '../../../core/types.ts';

export default class FileModal extends Modal {
  // define _origin of modal: chat/user
  private _origin: string;

  constructor(props: PropsType | ChildrenType) {
    super(props);

    this._origin = props.origin as string;
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

  private async fetchHandler(inputFiles: FileList) {
    const formData = new FormData();
    let status: number;

    formData.append('avatar', inputFiles[0]);

    if (this._origin === 'chat') {
      const chatId = (store.getState().currentChat as { [key: string]: number })
        .id;

      formData.append('chatId', chatId.toString());

      status = (await chatsController.changeAvatar({
        data: formData,
      })) as number;
    } else {
      status = (await userController.changeAvatar({
        data: formData,
      })) as number;
    }

    status === 200 ? this.closeModal() : this.handleError();
  }
}
