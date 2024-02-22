import tpl from './auth.hbs?raw';
import Block, { PropsType, ChildrenType } from '../../core/block.js';

export default class AuthPage extends Block {
    constructor(props: PropsType | ChildrenType) {
        super('main', props);
    }

    render(): DocumentFragment {
        // remove events data from props
        const propsToRender = (({ attr, ...rest }) => rest)(this.props);

        return this.compile(tpl, propsToRender);
    }

    // signFormHandler() {
    //     this.props.isLogIn = !this.props.isLogIn;
    // }
}
