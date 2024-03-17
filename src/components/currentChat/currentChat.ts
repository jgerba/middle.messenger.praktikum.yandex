import tpl from './currentChat.hbs?raw';
import Block, { PropsType, ChildrenType } from '../../core/block.ts';
// import Message from '../message/message.ts';
// import isReadSvg from './svg/isRead.svg';

/* eslint no-use-before-define:0 */
/* eslint prefer-template:0 */

export default class CurrentChat extends Block {
  constructor(props: PropsType | ChildrenType) {
    super('section', props);

    this.renderChat();
  }

  render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }

  renderChat() {
    // const chatRoot = this.element!.querySelector(
    //   '.current-chat__dialog',
    // ) as HTMLElement;
    // chatDummy.forEach((message) => {
    //   chatRoot.append(
    //     new Message({
    //       text: message.text,
    //       time: this.getTime(message.timestamp as number),
    //       isRead: message.isRead,
    //       isReadSvg,
    //       attr: {
    //         class: `message ${message.isPersonal ? 'personal-message' : ''}`,
    //       },
    //     }).getContent() as HTMLElement,
    //   );
    // });
  }

  getTime(timestamp: number): string {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const mins = date.getMinutes();
    return `${hours < 10 ? '0' + hours : hours}:${
      mins < 10 ? '0' + mins : mins
    }`;
  }
}
