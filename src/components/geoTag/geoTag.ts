import * as leaflet from 'leaflet';
import tpl from './geoTag.hbs?raw';
import Block from '../../core/block.js';

import { PropsType } from '../../core/types.ts';

export default class GeoTag extends Block {
  constructor(props: PropsType) {
    super('div', props);
  }

  protected render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }

  public renderMap(latitude: number, longitude: number) {
    const mapRoot = this.element!.querySelector(
      '.geo-tag__root',
    ) as HTMLElement;
    const map = leaflet.map(mapRoot).setView([latitude, longitude], 15);

    leaflet
      .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      })
      .addTo(map);

    // add marker to indicate the user's location
    leaflet.marker([latitude, longitude]).addTo(map);
  }
}
