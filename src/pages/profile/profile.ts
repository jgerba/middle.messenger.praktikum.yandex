import tpl from './profile.hbs?raw';
import Block, { PropsType, ChildrenType } from '../../core/block.js';

export default class ProfilePage extends Block {
    btns: { [key: string]: HTMLElement }[];
    forms: { [key: string]: HTMLElement }[];

    constructor(props: PropsType | ChildrenType) {
        super('main', props);

        this.addEvents();
    }

    render(): DocumentFragment {
        // remove events data from props
        const propsToRender = (({ attr, ...rest }) => rest)(this.props);

        return this.compile(tpl, propsToRender);
    }

    addEvents() {
        this.initElems();

        changeFormBtns.forEach(btn =>
            btn.addEventListener('click', this.changeForm.bind(this))
        );
    }

    initElems() {
        this.btns = [
            {
                profileBtn: this.element!.querySelector(
                    'button[title="Change profile"]'
                )!,
            },
            {
                passwordBtn: this.element!.querySelector(
                    'button[title="Change password"]'
                )!,
            },
            {
                logOutBtn: this.element!.querySelector(
                    'button[title="Log out"]'
                )!,
            },
            {
                backBtn: this.element!.querySelector(
                    'button[title="Step back"]'
                )!,
            },
        ];

        this.forms = [
            { profile: this.children.profile.element },
            { profileForm: this.children.profileForm.element },
            { passwordForm: this.children.passwordForm.element },
        ];

        console.log(this.forms);
    }

    changeForm() {
        const forms = this.element!.querySelectorAll('form');
        forms.forEach(form => form.classList.toggle('hidden'));
    }
}

