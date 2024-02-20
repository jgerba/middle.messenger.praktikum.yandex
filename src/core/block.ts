import { v4 as makeId } from 'uuid';
import EventBus from './event-bus.ts';
import Handlebars from 'handlebars';

import { setStubs, replaceStubs } from '../utils/handleStubs.ts';

export type PropsType = Record<
    string,
    string | Record<string, Function> | boolean
>;
export type ChildrenType = Record<string, Block | Block[] | any>;

export default class Block {
    props: PropsType;
    children: ChildrenType;
    eventBus: EventBus;
    _id: string;
    _meta: { tagName: string; props: PropsType };
    _element: HTMLElement | null;

    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    };

    constructor(tagName = 'div', props = {}) {
        this._element = null;
        this._meta = {
            tagName,
            props,
        };
        this._id = makeId();

        this.children = {};
        this.props = this._makePropsProxy({ ...props, _id: this._id });

        this.eventBus = new EventBus();
        this._registerEvents(this.eventBus);
        this.eventBus.emit(Block.EVENTS.INIT);
    }

    _makePropsProxy(props: ChildrenType): ChildrenType {
        const self = this;

        return new Proxy<ChildrenType>(props, {
            set(target: ChildrenType, prop: string, value: unknown): boolean {
                const oldProps = self._meta.props;
                target[prop] = value; // new props

                self.eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, target);
                return true;
            },
            deleteProperty() {
                throw new Error('нет доступа');
            },
        });
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    _init() {
        this._createResources();
        this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }

    _createResources() {
        const { tagName } = this._meta;
        this._element = this._createDocumentElement(tagName);
    }

    _createDocumentElement(tagName: string) {
        const el = document.createElement(tagName);
        el.setAttribute('data-id', this._id);
        return el;
    }

    _render() {
        const hasEvents =
            this.props.events && Object.keys(this.props.events).length > 0;

        const block = this.render();

        this._element!.innerHTML = '';
        if (hasEvents) {
            this._removeEvents();
        }

        this._element!.appendChild(block);
        this._element = this._element!.firstElementChild as HTMLElement;

        if (hasEvents) {
            this._addEvents();
        }
    }

    render() {
        return new DocumentFragment();
    }

    compile(tpl: string, props: PropsType | ChildrenType): DocumentFragment {
        const hasChildren = Object.keys(this.children).length > 0;

        let propsCopy = { ...props, ...this.children };

        if (hasChildren) {
            propsCopy = setStubs(this.children, propsCopy);
        }

        const fragment = document.createElement('template');
        fragment.innerHTML = Handlebars.compile(tpl)(propsCopy);

        if (hasChildren) {
            console.log(tpl);

            replaceStubs(fragment, this.children);
        }

        return fragment.content;
    }

    _addEvents() {
        Object.entries(this.props.events).forEach(([event, callback]) =>
            this._element!.addEventListener(event, callback)
        );
    }

    _removeEvents() {
        Object.entries(this.props.events).forEach(([event, callback]) =>
            this._element!.removeEventListener(event, callback)
        );
    }

    _componentDidMount() {
        this.componentDidMount();

        Object.values(this.children).forEach(child => {
            child.dispatchComponentDidMount();
        });
    }

    componentDidMount() {}

    dispatchComponentDidMount() {
        this.componentDidMount();

        Object.values(this.children).forEach(child => {
            child.dispatchComponentDidMount();
        });
    }

    _componentDidUpdate(oldProps: {}, newProps: {}) {
        const update = this.componentDidUpdate(oldProps, newProps);
        if (update) {
            this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    componentDidUpdate(oldProps: {}, newProps: {}) {
        return oldProps !== newProps;
    }

    get element() {
        return this._element;
    }

    getContent() {
        return this.element;
    }

    show() {
        const el = this.getContent();
        el!.style.display = 'block';
    }

    hide() {
        const el = this.getContent();
        el!.style.display = 'none';
    }
}
