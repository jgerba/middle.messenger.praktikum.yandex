import tpl from './chatHeader.hbs?raw';
import Block, { PropsType, ChildrenType } from '../../core/block.ts';

export default class ChatHeader extends Block {
    constructor(props: PropsType | ChildrenType) {
        super('header', props);
    }

    render(): DocumentFragment {
        // remove events data from props
        const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

        return this.compile(tpl, propsToRender);
    }
}
