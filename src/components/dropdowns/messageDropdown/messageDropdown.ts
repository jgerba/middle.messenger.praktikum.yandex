import tpl from './messageDropdown.hbs?raw';
import Block from '../../../core/block.ts';

import store from '../../../core/store.ts';
import WSController from '../../../controllers/WS-controller.ts';

import Dropdown from '../dropdown.ts';

import { PropsType, ChildrenType } from '../../../core/types.ts';
import { MSG, POP_MSG } from '../../../core/const.ts';

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
    (this.children.locationBtn as Block).addEvent('click', this.sendLocation);
  }

  private addMedia() {
    console.log('Adding media...');
  }

  private addFile() {
    console.log('Adding file...');
  }

  private sendLocation() {
    /* eslint no-inner-declarations: 0 */

    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      const success = (pos: GeolocationPosition) => {
        const crd = pos.coords as GeolocationCoordinates;
        WSController.sendMessage({
          message: `${MSG.GEO}latitude: ${crd.latitude}, longitude: ${crd.longitude}`,
        });
      };

      function error(err: GeolocationPositionError) {
        store.setState('popUp', {
          message: `${err.code} ${err.message}`,
          isError: true,
        });
      }

      navigator.geolocation.getCurrentPosition(success, error, options);
    } else {
      store.setState('popUp', {
        message: POP_MSG.GEO_FAIL,
        isError: true,
      });
    }
  }
}
