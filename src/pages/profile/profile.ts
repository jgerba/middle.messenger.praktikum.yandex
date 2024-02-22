import tpl from './profile.hbs?raw';
import Block, { PropsType, ChildrenType } from '../../core/block.js';

export default class ProfilePage extends Block {
    constructor(props: PropsType | ChildrenType) {
        super('main', props);

        // this.addEvents();
    }

    render(): DocumentFragment {
        // remove events data from props
        const propsToRender = (({ attr, ...rest }) => rest)(this.props);

        return this.compile(tpl, propsToRender);
    }

    // addEvents() {
    //     const changeFormBtns = this.element!.querySelectorAll('.btn--extra');

    //     changeFormBtns.forEach(btn =>
    //         btn.addEventListener('click', this.changeForm.bind(this))
    //     );
    // }

    // changeForm() {
    //     const forms = this.element!.querySelectorAll('form');
    //     forms.forEach(form => form.classList.toggle('hidden'));
    // }
}
