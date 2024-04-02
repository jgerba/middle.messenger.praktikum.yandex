import tpl from './messageDropdown.hbs?raw';
import Block from '../../../core/block.ts';

import Dropdown from '../dropdown.ts';

import { PropsType, ChildrenType } from '../../../core/types.ts';

export default class MessageDropdown extends Dropdown {
  constructor(props: PropsType | ChildrenType) {
    super(props);

    this.initOptions();
  }

  protected render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }

  private initOptions() {
    (this.children.photoVideoBtn as Block).addEvent(
      'click',
      this.addMedia.bind(this),
    );
    (this.children.fileBtn as Block).addEvent('click', this.addFile.bind(this));
    (this.children.locationBtn as Block).addEvent(
      'click',
      this.addLocation.bind(this),
    );
  }

  private addMedia() {
    console.log('Adding media...');
  }

  private addFile() {
    console.log('Adding file...');
  }

  private addLocation() {
    console.log('Adding location...');
  }
}
