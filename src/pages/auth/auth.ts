import tpl from './auth.hbs?raw';
import Block from '../../core/block.js';
import LogInForm from '../../components/signInForm/logInForm.ts';
import CreateUserForm from '../../components/signUpForm/createUserForm.ts';

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
            authForm: this.props.isLogIn
                ? new LogInForm({
                      signFormCallback: this.signFormHandler.bind(this),
                  })
                : new CreateUserForm({
                      signFormCallback: this.signFormHandler.bind(this),
                  }),
        };
    }

    signFormHandler() {
        this.props.isLogIn = !this.props.isLogIn;
    }
}
