import tpl from './signUpForm.hbs?raw';
import Block from '../../core/block.ts';

import { PropsType } from '../../core/block.js';
import { ChildrenType } from '../../core/block.js';

export default class SignUpForm extends Block {
    constructor(props: PropsType | ChildrenType) {
        super('main', props);
    }

    render(): DocumentFragment {
        // remove events data from props
        const propsToRender = (({ events, ...rest }) => rest)(this.props);

        return this.compile(tpl, propsToRender);
    }
}
