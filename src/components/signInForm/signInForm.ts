import tpl from './signInForm.hbs?raw';
import Block from '../../core/block.ts';

import { PropsType } from '../../core/block.js';
import { ChildrenType } from '../../core/block.js';

export default class SignInForm extends Block {
    constructor(props: PropsType | ChildrenType) {
        super('main', props);
    }

    render(): DocumentFragment {
        // remove events data from props
        const propsToRender = (({ notFound }) => ({
            notFound,
        }))(this.props);

        return this.compile(tpl, propsToRender);
    }
}