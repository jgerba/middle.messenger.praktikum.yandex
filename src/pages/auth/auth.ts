import tpl from './auth.hbs?raw';
import Block, { PropsType, ChildrenType } from '../../core/block.js';

export default class AuthPage extends Block {
    isLogin;

    constructor(props: PropsType | ChildrenType) {
        super('main', props);

        this.isLogin = this.props.isLogIn as boolean;
        this.changeFormInit();
    }

    render(): DocumentFragment {
        // remove events data from props
        const propsToRender = (({ attr, ...rest }) => rest)(this.props);

        return this.compile(tpl, propsToRender);
    }

    changeFormInit() {
        const btn = this.element!.querySelector('.btn--extra');
        btn?.addEventListener('click', this.changeForm);
    }

    changeForm() {
        console.log(this.isLogin);

        this.props.isLogIn = !this.props.isLogIn;
    }
}
