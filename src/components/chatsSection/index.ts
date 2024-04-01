import ChatsSection from './chatsSection.ts';

import Button from '../button/button.ts';
import searchForm from '../forms/searchForm/index.ts';
import Modal from '../modals/textModal/textModal.ts';
import FormInput from '../inputs/formInput.ts';

function openCreateChatModal() {
  /* eslint no-new: 0 */

  new Modal({
    textInput: new FormInput('div', {
      name: 'title',
      text: 'Chat title',
      attr: { class: 'input-wrapper ' },
    }),
    submitBtn: new Button('button', {
      text: 'Create',
      attr: { class: 'btn', type: 'submit' },
    }),

    modalHeader: 'New chat',
    attr: { class: 'modal' },
    events: {},
  });
}

export default new ChatsSection('section', {
  searchForm,
  createChatBtn: new Button('button', {
    text: 'New chat',
    attr: { class: 'btn', type: 'button' },
    events: { click: openCreateChatModal },
  }),
  attr: { class: 'chats-section' },
});
