import Modal from './userModal';
import FormInput from '../../inputs/formInput';
import Button from '../../button/button';

export default new Modal({
  userInput: new FormInput({
    name: 'login',
    text: 'Login',
    attr: { class: 'input-wrapper ' },
  }),
  addBtn: new Button({
    text: 'Add',
    attr: { class: 'btn', type: 'submit' },
  }),

  modalType: 'Add',
  attr: { class: 'modal hidden' },
  events: {},
});
