import tpl from './profileField.hbs?raw';
import Block, { PropsType } from '../../core/block.js';

export default class ProfileField extends Block {
    constructor(props: PropsType) {
        super('div', props);
    }

    render(): DocumentFragment {
        // remove events data from props
        // iife - destructure props from argument, return rest (no unused vars)
        const propsToRender = (({ attr, ...rest }) => rest)(this.props);

        return this.compile(tpl, propsToRender);
    }
}
