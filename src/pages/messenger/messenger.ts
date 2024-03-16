import tpl from './messenger.hbs?raw';
import Block, { PropsType, ChildrenType } from '../../core/block.ts';
import ChatPreview from '../../components/chatPreview/chatPreview.ts';
import Message from '../../components/message/message.ts';
import fallbackImg from './svg/fallback-img.svg';
import isReadSvg from './svg/isRead.svg';
import router from '../../main.ts';

/* eslint no-use-before-define:0 */
/* eslint prefer-template:0 */

export default class Messenger extends Block {
  constructor(props: PropsType | ChildrenType) {
    const onAnchorClick = (event: MouseEvent) => this.anchorHandler(event);

    super('div', { ...props, events: { click: onAnchorClick } });

    this.initBtns();
    this.renderPreviews();
    this.renderChat();
  }

  render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }

  initBtns() {
    const createChatBtn = this.children.createChatBtn as Block;

    createChatBtn.addEvent('click', this.createChatHandler.bind(this));
  }

  createChatHandler() {
    console.log(123);
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

  renderChat() {
    const chatSection = this.element!.querySelector(
      '.chat__dialog',
    ) as HTMLElement;

    chatDummy.forEach((message) => {
      chatSection.append(
        new Message({
          text: message.text,
          time: this.getTime(message.timestamp as number),
          isRead: message.isRead,
          isReadSvg,
          attr: {
            class: `message ${message.isPersonal ? 'personal-message' : ''}`,
          },
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
const chatDummy: { [key: string]: string | boolean | number }[] = [
  {
    text: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.  Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
    img: '',
    timestamp: 1707892583,
    isRead: false,
    isPersonal: false,
  },
  {
    text: 'Круто!',
    img: '',
    timestamp: 1707754583,
    isRead: true,
    isPersonal: true,
  },
];

