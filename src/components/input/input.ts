import tpl from './input.hbs?raw';
import Block, { PropsType } from '../../core/block.js';

export default class Input extends Block {
    constructor(props: PropsType) {
        super('div', props);
    }

    render(): DocumentFragment {
        // remove events data from props
        const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

        return this.compile(tpl, propsToRender);
    }
}
