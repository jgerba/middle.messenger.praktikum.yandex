import tpl from './error.hbs?raw';
import Block from '../../core/block.js';

import { PropsType } from '../../core/block.js';
import { ChildrenType } from '../../core/block.js';

export default class ErrorPage extends Block {
    constructor(props: PropsType | ChildrenType) {
        super('main', props);
    }

    render(): DocumentFragment {
        const propsToRender = (({ events, ...rest }) => rest)(this.props);

        return this.compile(tpl, propsToRender);
    }
}
