import tpl from './auth.hbs?raw';
import Block from '../../core/block.js';
import SignInForm from '../../components/signInForm/signInForm.ts';
import SignUpForm from '../../components/signUpForm/signUpForm.ts';

import { PropsType } from '../../core/block.js';
import { ChildrenType } from '../../core/block.js';

export default class AuthPage extends Block {
    constructor(props: PropsType | ChildrenType) {
        super('main', props);
    }

    render(): DocumentFragment {
        this.initChildren();

        // remove events data from props
        const propsToRender = (({ events, ...rest }) => rest)(this.props);

        return this.compile(tpl, propsToRender);
    }

    initChildren() {
        this.children = {
            signInForm: new SignInForm({}),
            signUpForm: new SignUpForm({}),
        };
    }
}
