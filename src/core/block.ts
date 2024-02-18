import { v4 as makeId } from 'uuid';
import EventBus from './event-bus.ts';
import Handlebars from 'handlebars';

import { BtnInterface } from '../components/button/button.ts';
import { PageInterface } from '../pages/somePage/page.ts';

export default class Block {
    props: BtnInterface | PageInterface;
    children: BtnInterface | PageInterface;
    eventBus: EventBus;
    _id: string;

    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    };

    // _element = null;
    // _meta = null;
    _element: HTMLElement | null;
    _meta;

    constructor(tagName: string, props: BtnInterface | PageInterface) {
        this._element = null;

        this._meta = {
            tagName: tagName,
            props: props,
        };

        this.children = this._getChildren(props);
        this.eventBus = new EventBus();
        this._id = makeId();

        this.props = this._makePropsProxy({ ...props, _id: this._id });
        this._registerEvents(this.eventBus);
        this.eventBus.emit(Block.EVENTS.INIT);
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    init() {
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

    _componentDidMount() {
        this.componentDidMount();

        Object.values(this.children).forEach(child => {
            child.dispatchComponentDidMount();
        });
    }

    dispatchComponentDidMount() {}

    componentDidMount() {}

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

    _render() {
        if (Object.keys(this.children).length !== 0) {
            const block = this.render() as unknown;

            this._element!.innerHTML = '';
            this._removeEvents();

            this._element!.appendChild(block as DocumentFragment);
            this._element = this._element!.firstElementChild as HTMLElement;
        } else {
            const tplString = this.render() as unknown;

            if (tplString) {
                const parser = new DOMParser();
                const htmlDoc = parser.parseFromString(
                    tplString as string,
                    'text/html'
                );
                const el = htmlDoc.querySelector(
                    this._meta.tagName
                ) as HTMLElement;

                el.getAttributeNames().forEach(name => {
                    this._element!.setAttribute(
                        name,
                        el.getAttribute(name) || ''
                    );
                });

                if (el.innerText) {
                    this._element!.innerText = el.innerText;
                }
            }
        }

        this._addEvents();
    }

    render() {}

    compile(template: string, props: PageInterface): DocumentFragment {
        const propsCopy = { ...props };

        Object.entries(this.children).forEach(([key, child]) => {
            propsCopy[key] = `<div data-id="${child._id}"></div>`;
        });

        const fragment = document.createElement('template');
        fragment.innerHTML = Handlebars.compile(template)(propsCopy);

        Object.values(this.children).forEach(child => {
            const stub = fragment.content.querySelector(
                `[data-id="${child._id}"]`
            );

            if (stub) {
                stub.replaceWith(child.getContent());
            }
        });

        return fragment.content;
    }

    getContent() {
        return this.element;
    }

    _makePropsProxy(props: BtnInterface | PageInterface) {
        const self = this;

        return new Proxy(props, {
            set(target: any, prop, value) {
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

    _addEvents() {
        const { events = {} } = this.props;

        Object.entries(events).forEach(([event, callback]) =>
            this._element!.addEventListener(event, callback)
        );
    }

    _removeEvents() {
        const { events = {} } = this.props;

        Object.entries(events).forEach(([event, callback]) =>
            this._element!.removeEventListener(event, callback)
        );
    }

    _getChildren(props: any) {
        const children: { [key: string]: Block } = {};

        Object.entries(props).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            }
        });

        return children;
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
