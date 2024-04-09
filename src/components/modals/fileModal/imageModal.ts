import FileModal from './fileModal.ts';

import resourcesController from '../../../controllers/resources-controller.ts';

export default class ImageModal extends FileModal {
  protected async fetchHandler(inputFiles: FileList) {
    const formData = new FormData();

    formData.append('resource', inputFiles[0]);

    const status = (await resourcesController.uploadImage({
      data: formData,
    })) as number;

    if (status === 200) {
      this.closeModal();
    }
  }
}
