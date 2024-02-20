import tpl from './signUpForm.hbs?raw';
import Block from '../../core/block.ts';
import Button from '../button/button.ts';
import Input from '../input/input.ts';

import { PropsType } from '../../core/block.js';
import { ChildrenType } from '../../core/block.js';

export default class SignUpForm extends Block {
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
            emailInput: new Input({
                name: 'email',
                text: 'Email',
                type: 'email',
            }),
            loginInput: new Input({
                name: 'login',
                text: 'Login',
            }),
            nameInput: new Input({
                name: 'first_name',
                text: 'Name',
            }),
            surnameInput: new Input({
                name: 'second_name',
                text: 'Surname',
            }),
            phoneInput: new Input({
                name: 'phone',
                text: 'Phone',
                type: 'phone',
            }),
            passInput: new Input({
                name: 'password',
                text: 'Password',
                type: 'password',
            }),
            confirmPassInput: new Input({
                name: 'password-confirm',
                text: 'Confirm password',
                type: 'password',
            }),

            submitBtn: new Button({
                submit: true,
                text: 'Create account',
                events: {
                    submit: (event: Event) => {
                        console.log(event);
                    },
                },
            }),
            signInBtn: new Button({
                ['extra-btn']: true,
                text: 'Sign in',
                events: {
                    click: (event: Event) => {
                        console.log(event);
                    },
                },
            }),
        };
    }
}
