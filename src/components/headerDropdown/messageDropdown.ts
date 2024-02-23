import tpl from './messageDropdown.hbs?raw';
import Block, { PropsType, ChildrenType } from '../../core/block.ts';

export default class MessageDropdown extends Block {
    constructor(props: PropsType | ChildrenType) {
        super('article', props);
    }

    render(): DocumentFragment {
        // remove events data from props
        const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

        return this.compile(tpl, propsToRender);
    }
}
