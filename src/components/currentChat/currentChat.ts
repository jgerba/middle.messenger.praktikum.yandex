import tpl from './currentChat.hbs?raw';
import Block from '../../core/block.ts';
import store, { StoreEvents } from '../../core/store.ts';

import Message from '../message/message.ts';
import GeoTag from '../geoTag/geoTag.ts';
import isReadSvg from './svg/isRead.svg';

import formatDate from '../../utils/formatDate.ts';
import isEqual from '../../utils/isEqual.ts';
import getDataToUpdate from '../../utils/getUpdateData.ts';
import getCoordsFromString from '../../utils/getCoordsFromString.ts';
// import checkIP from '../../utils/checkIP.ts';

import { PropsType, ChildrenType, IndexedType } from '../../core/types.ts';
import ImageMessage from '../imageMessage/imageMessage.ts';
import { BASE_URL } from '../../core/const.ts';
import getImagePath from '../../utils/getImagePath.ts';

/* eslint no-use-before-define:0 */
/* eslint prefer-template:0 */

export default class CurrentChat extends Block {
  private _prevMessages: PropsType[] | [] = [];

  private _chatRoot: HTMLElement;

  constructor(props: PropsType | ChildrenType) {
    super('section', props);

    this._chatRoot = this.element!.querySelector('.current-chat__dialog')!;

    this.updateMessages();
    store.on(StoreEvents.Updated, this.updateMessages.bind(this));
  }

  protected render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }

  private updateMessages() {
    const newData = this.getData();

    if (!newData) {
      return;
    }

    if (this._prevMessages.length === 0) {
      this._prevMessages = [...newData];
      this.renderChat(this._prevMessages);
      return;
    }

    const dataToAdd = getDataToUpdate(newData, this._prevMessages);

    if (dataToAdd.length > 0) {
      // prepend new chat to previous rendered chats
      this.renderChat(dataToAdd);
    }

    this._prevMessages = [...newData];
  }

  private getData(): PropsType[] | null {
    const currentChat = store.getState().currentChat as IndexedType;

    if (!currentChat || !currentChat.id) {
      // clear chat rendered messages when del chat/switch between chats
      this._prevMessages = [];
      this._chatRoot.innerHTML = '';
      return null;
    }

    const newMessages = currentChat?.messages as unknown;

    if (!newMessages || (newMessages as PropsType[]).length === 0) {
      return null;
    }

    const isSameData = isEqual(
      newMessages as PropsType[],
      this._prevMessages as PropsType[],
    );

    if (isSameData) {
      return null;
    }

    return newMessages as PropsType[];
  }

  renderChat(messages: PropsType[]) {
    if (!messages || messages.length === 0) {
      this._chatRoot.innerHTML = '';
      return;
    }

    messages
      .sort((a, b) => {
        const bTime = new Date(b.time as string) as unknown;
        const aTime = new Date(a.time as string) as unknown;

        return (aTime as number) - (bTime as number);
      })
      .forEach((message) => {
        this.messageConstructor(message);
      });
  }

  async messageConstructor(message: PropsType) {
    const user = store.getState().user as IndexedType;
    const isPersonalMsg = message.user_id === user.id;
    const coords = getCoordsFromString(message.content as string);

    if (coords) {
      this.createGeoMessage(message, coords, isPersonalMsg);
      return;
    }

    const imagePath = getImagePath(message.content as string);
    if (imagePath) {
      this.createImageMessage(message, imagePath, isPersonalMsg);
      return;
    }

    this.createTextMessage(message, isPersonalMsg);
  }

  createGeoMessage(
    message: PropsType,
    coords: {
      latitude: number;
      longitude: number;
    },
    isPersonalMsg: boolean,
  ) {
    const geoTag = new GeoTag({
      time: formatDate(message.time as string),
      attr: {
        class: `geo-tag censorship${isPersonalMsg ? ' personal-message' : ''}`,
      },
    });

    // switched off because of the mixed content http/https
    // only for local-server use
    // const isDemocracy = await checkIP();
    // if (isDemocracy) {
    //   geoTag.element?.classList.remove('censorship');
    // }

    this._chatRoot.prepend(geoTag.getContent() as HTMLElement);

    geoTag.renderMap(coords.latitude, coords.longitude);
  }

  createImageMessage(
    message: PropsType,
    imagePath: string,
    isPersonalMsg: boolean,
  ) {
    this._chatRoot.prepend(
      new ImageMessage({
        path: `${BASE_URL}/resources/${imagePath}`,
        time: formatDate(message.time as string),
        attr: {
          class: `image-message${isPersonalMsg ? ' personal-message' : ''}`,
        },
      }).getContent() as HTMLElement,
    );
  }

  createTextMessage(message: PropsType, isPersonalMsg: boolean) {
    this._chatRoot.prepend(
      new Message({
        content: message.content,
        time: formatDate(message.time as string),
        isRead: message.isRead,
        isReadSvg,
        attr: {
          class: `message${isPersonalMsg ? ' personal-message' : ''}`,
        },
      }).getContent() as HTMLElement,
    );
  }
}
