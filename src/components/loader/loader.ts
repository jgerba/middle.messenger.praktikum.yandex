import tpl from './loader.hbs?raw';
import Block from '../../core/block.js';

import { PropsType } from '../../core/types.ts';

export default class Loader extends Block {
  private popUpRoot: HTMLElement;

  constructor(props: PropsType) {
    super('div', props);

    this.popUpRoot = document.getElementById('popup-root')!;
    this.popUpRoot.append(this.getContent());
  }

  protected render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }
}
