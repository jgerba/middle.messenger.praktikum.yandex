import tpl from './input.hbs?raw';
import Block from '../../core/block.js';

import { PropsType } from '../../core/block.js';

export default class Input extends Block {
    constructor(props: PropsType) {
        super('main', props);
    }

    render(): DocumentFragment {
        // remove events data from props
        const propsToRender = (({ events, ...rest }) => rest)(this.props);

        return this.compile(tpl, propsToRender);
    }
}
