import tpl from './input.hbs?raw';
import Block, { PropsType } from '../../core/block.js';

export default class Input extends Block {
    constructor(props: PropsType) {
        super('div', props);

        this.initElems();
    }

    render(): DocumentFragment {
        // remove events data from props
        const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

        return this.compile(tpl, propsToRender);
    }

    initElems() {
        const input = this.element!.querySelector('input');

        input?.addEventListener('focus', this.toggleLabel.bind(this));
        input?.addEventListener('blur', this.toggleLabel.bind(this));
    }

    toggleLabel() {
        const label = this.element!.querySelector('label');

        label?.classList.toggle('label--small');
        label?.classList.toggle('label--hidden');
    }
}

