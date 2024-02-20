import tpl from './signInForm.hbs?raw';
import Block from '../../core/block.ts';
import Button from '../button/button.ts';
import Input from '../input/input.ts';

import { PropsType } from '../../core/block.js';
import { ChildrenType } from '../../core/block.js';

export default class SignInForm extends Block {
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
        this.children.nameInput = new Input({ name: 'login', text: 'Login' });
        this.children.passInput = new Input({
            name: 'password',
            text: 'Password',
            type: 'password',
        });

        this.children.submitBtn = new Button({
            submit: true,
            text: 'Enter',
            events: {
                submit: (event: Event) => {
                    console.log(event);
                },
            },
        });
        this.children.signUpBtn = new Button({
            ['extra-btn']: true,
            text: 'Sign up',
            events: {
                click: (event: Event) => {
                    console.log(event);
                },
            },
        });
    }
}
