import FileModal from './fileModal.ts';

import userController from '../../../controllers/user-controller.ts';

export default class AvatarModal extends FileModal {
  protected async fetchHandler(inputFiles: FileList) {
    const formData = new FormData();

    formData.append('avatar', inputFiles[0]);

    const status = (await userController.changeAvatar({
      data: formData,
    })) as number;

    if (status === 200) {
      this.closeModal();
    }
  }
}
