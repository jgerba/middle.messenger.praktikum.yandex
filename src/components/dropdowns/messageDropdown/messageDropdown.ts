import tpl from './messageDropdown.hbs?raw';
import { PropsType, ChildrenType } from '../../../core/block.ts';
import Dropdown from '../dropdown.ts';

export default class MessageDropdown extends Dropdown {
  constructor(props: PropsType | ChildrenType) {
    super(props);

    this.initOpenDropBtn();
    this.initOptions();
  }

  render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }

  initOptions() {
    this.children.photoVideoBtn.addEvent('click', this.addMedia.bind(this));
    this.children.fileBtn.addEvent('click', this.addFile.bind(this));
    this.children.locationBtn.addEvent('click', this.addLocation.bind(this));
  }

  /* eslint class-methods-use-this: 0 */
  /* eslint no-console: 0 */

  addMedia() {
    console.log('Adding media...');
  }

  addFile() {
    console.log('Adding file...');
  }

  addLocation() {
    console.log('Adding location...');
  }
}

