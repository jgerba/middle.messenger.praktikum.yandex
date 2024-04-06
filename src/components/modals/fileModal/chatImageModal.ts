import FileModal from './fileModal.ts';

import store from '../../../core/store.ts';
import chatsController from '../../../controllers/chats-controller.ts';

export default class ChatImageModal extends FileModal {
  protected async fetchHandler(inputFiles: FileList) {
    const formData = new FormData();

    formData.append('avatar', inputFiles[0]);

    const chatId = (store.getState().currentChat as { [key: string]: number })
      .id;

    formData.append('chatId', chatId.toString());

    const status = (await chatsController.changeAvatar({
      data: formData,
    })) as number;

    if (status === 200) {
      this.closeModal();
    }
  }
}
