import tpl from './auth.hbs?raw';
import Block from '../../core/block.js';
import SignInForm from '../../components/signInForm/signInForm.ts';
import SignUpForm from '../../components/signUpForm/signUpForm.ts';

import { PropsType } from '../../core/block.js';

export default class AuthPage extends Block {
    constructor(props: PropsType) {
        super('main', props);
    }

    render(): DocumentFragment {
        this.initChildren();

        // remove events data from props
        const propsToRender = (({ events, rootEl, ...rest }) => rest)(
            this.props
        );

        return this.compile(tpl, propsToRender);
    }

    initChildren() {
        this.children = {
            signForm: this.props.isLogIn
                ? new SignInForm({
                      signFormCallback: this.signFormHandler.bind(this),
                  })
                : new SignUpForm({
                      signFormCallback: this.signFormHandler.bind(this),
                  }),
        };
    }

    signFormHandler() {
        this.props.isLogIn = !this.props.isLogIn;
    }
}
