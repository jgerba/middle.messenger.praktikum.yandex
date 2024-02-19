import tpl from './input.hbs?raw';
import Block from '../../core/block.js';

import { PropsType } from '../../core/block.js';
import { ChildrenType } from '../../core/block.js';

export default class Input extends Block {
    constructor(props: PropsType | ChildrenType) {
        super('main', props);
    }

    render(): DocumentFragment {
        // remove events data from props
        const propsToRender = (({
            className,
            isFocused,
            upload,
            name,
            text,
            search,
            type,
            errorText,
        }) => ({
            className,
            isFocused,
            upload,
            name,
            text,
            search,
            type,
            errorText,
        }))(this.props);

        return this.compile(tpl, propsToRender);
    }
}
