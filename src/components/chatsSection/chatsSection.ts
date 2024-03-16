import tpl from './chatsSection.hbs?raw';
import Block, { PropsType, ChildrenType } from '../../core/block.ts';
import ChatPreview from '../chatPreview/chatPreview.ts';
import fallbackImg from './svg/fallback-img.svg';
import router from '../../main.ts';

import Modal from '../modals/textModal/textModal.ts';
import FormInput from '../inputs/formInput.ts';
import Button from '../button/button.ts';

/* eslint no-use-before-define:0 */
/* eslint prefer-template:0 */

export default class ChatsSection extends Block {
  constructor(props: PropsType | ChildrenType) {
    const onAnchorClick = (event: MouseEvent) => this.anchorHandler(event);

    super('section', { ...props, events: { click: onAnchorClick } });

    this.initBtns();
    this.renderPreviews();
  }

  render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }

  initBtns() {
    const createChatBtn = this.children.createChatBtn as Block;

    createChatBtn.addEvent('click', this.openCreateModal.bind(this));
  }

  openCreateModal() {
    /* eslint no-new: 0 */

    new Modal({
      textInput: new FormInput({
        name: 'title',
        text: 'Chat title',
        attr: { class: 'input-wrapper ' },
      }),
      submitBtn: new Button({
        text: 'Create',
        attr: { class: 'btn', type: 'submit' },
      }),

      modalHeader: 'New chat',
      attr: { class: 'modal' },
      events: {},
    });
  }

  renderPreviews() {
    const previewSection = this.element!.querySelector(
      '.chat__chats-preview',
    ) as HTMLElement;

    previewDummy.forEach((chat) => {
      previewSection.append(
        new ChatPreview({
          avatarImg: chat.avatarImg ? chat.avatarImg : fallbackImg,
          headerText: chat.chatHeader,
          text: chat.chatText,
          time: this.getTime(chat.timestamp as number),
          isUnread: chat.isUnread,
          unreadNum: chat.unreadNum,
          attr: { class: 'chat-preview' },
          events: { click: this.chatPreviewHandler },
        }).getContent() as HTMLElement,
      );
    });
  }

  getTime(timestamp: number): string {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const mins = date.getMinutes();
    return `${hours < 10 ? '0' + hours : hours}:${
      mins < 10 ? '0' + mins : mins
    }`;
  }

  chatPreviewHandler() {
    console.log('Chat is openeing...');
  }

  anchorHandler(event: MouseEvent) {
    if (!(event.target as HTMLElement).classList.contains('settings-link')) {
      return;
    }
    event.preventDefault();
    router.go('/settings');
  }
}

const previewDummy: { [key: string]: string | boolean | number }[] = [
  {
    avatarImg: '',
    chatHeader: 'тет-а-теты',
    chatText: 'И Human Interface Guidelines и Material Design рекомендуют...',
    timestamp: 1707892583,
    isUnread: true,
    unreadNum: 2,
  },
  {
    avatarImg: '',
    chatHeader: 'Design Destroyer',
    chatText: 'В 2008 году художник Jon Rafman  начал собирать...',
    timestamp: 1652510183,
    isUnread: false,
    unreadNum: 0,
  },
];
