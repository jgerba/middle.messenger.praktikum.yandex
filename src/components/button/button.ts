import tpl from './button.hbs?raw';
import Block from '../../core/block.js';

import { PropsType } from '../../core/block.js';
import { ChildrenType } from '../../core/block.js';

export default class Button extends Block {
    constructor(props: PropsType | ChildrenType) {
        super('button', props);
    }

    render(): DocumentFragment {
        // remove events data from props
        // iife - destructure props from argument, return rest (no unused vars)
        const propsToRender = (({ events, ...rest }) => rest)(this.props);

        return this.compile(tpl, propsToRender);
    }
}
