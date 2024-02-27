import tpl from './chat.hbs?raw';
import Block, { PropsType, ChildrenType } from '../../core/block.js';
import ChatPreview from '../../components/chatPreview/chatPreview.js';
import fallbackImg from './svg/fallback-img.svg';

/* eslint no-use-before-define:0 */
/* eslint class-methods-use-this:0 */
/* eslint prefer-template:0 */
/* eslint no-console:0 */

export default class ChatPage extends Block {
  constructor(props: PropsType | ChildrenType) {
    super('div', props);

    this.renderPreviews();
  }

  render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }

  renderPreviews() {
    const previewSection = this.element!.querySelector(
      '.chat__chats-preview',
    ) as HTMLElement;

    previewDummy.forEach((chat) => {
      previewSection.append(
        new ChatPreview({
          avatarImg: chat.avatarImg ? chat.avatarImg : fallbackImg,
          chatHeader: chat.chatHeader,
          chatText: chat.chatText,
          chatTime: this.getPreviewTime(chat.timeStamp as number),
          isUnread: chat.isUnread,
          unreadNum: chat.unreadNum,
          attr: { class: 'chat-preview' },
          events: { click: this.chatPreviewHandler },
        }).getContent() as HTMLElement,
      );
    });
  }

  getPreviewTime(timesatmp: number): string {
    const date = new Date(timesatmp);
    const hours = date.getHours();
    const mins = date.getMinutes();
    return `${hours < 10 ? '0' + hours : hours}:${
      mins < 10 ? '0' + mins : mins
    }`;
  }

  chatPreviewHandler() {
    console.log('Chat is openeing...');
  }
}

const previewDummy: { [key: string]: string | boolean | number }[] = [
  {
    avatarImg: '',
    chatHeader: 'тет-а-теты',
    chatText: 'И Human Interface Guidelines и Material Design рекомендуют...',
    timeStamp: 1707892583,
    isUnread: true,
    unreadNum: 2,
  },
  {
    avatarImg: '',
    chatHeader: 'Design Destroyer',
    chatText: 'В 2008 году художник Jon Rafman  начал собирать...',
    timeStamp: 1652510183,
    isUnread: false,
    unreadNum: 0,
  },
];
