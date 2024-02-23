import Input from '../input/input';
import messageDropdown from '../messageDropdown';
import MessageForm from './messageForm';
import scrapSvg from './svg/scrap.svg';
import sendSvg from './svg/send.svg';

export default new MessageForm({
    dropdown: messageDropdown,
    messageInput: new Input({
        name: 'message',
        text: 'Message',
        search: true,
        attr: { class: 'input-wrapper message-form__input' },
    }),

    scrapIcon: scrapSvg,
    sendIcon: sendSvg,
    attr: { class: 'message-form' },
});
