import tpl from './auth.hbs?raw';
import Block, { PropsType, ChildrenType } from '../../core/block.js';

export default class AuthPage extends Block {
    constructor(props: PropsType | ChildrenType) {
        super('main', props);

        this.changeFormInit();
    }

    render(): DocumentFragment {
        // remove events data from props
        const propsToRender = (({ attr, ...rest }) => rest)(this.props);

        return this.compile(tpl, propsToRender);
    }

    changeFormInit() {
        const changeFormBtns = this.element!.querySelectorAll('.btn--extra');

        changeFormBtns.forEach(btn =>
            btn.addEventListener('click', this.changeForm.bind(this))
        );
    }

    changeForm() {
        const forms = this.element!.querySelectorAll('form');
        forms.forEach(form => form.classList.toggle('hidden'));
    }
}

