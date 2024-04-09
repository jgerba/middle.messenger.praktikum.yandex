import { v4 as makeId } from 'uuid';
import Handlebars from 'handlebars';
import EventBus from './event-bus.ts';

import { setStubs, replaceStubs } from '../utils/handleStubs.ts';
import { PropsType, ChildrenType } from './types.ts';
import isEqual from '../utils/isEqual.ts';

export default class Block {
  public props: PropsType;

  public children: ChildrenType;

  private _eventBus: EventBus;

  private _id: string;

  private _meta: { tagName: string; props: PropsType };

  private _element: HTMLElement | null;

  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_CWU: 'flow:component-will-unmount',
    FLOW_RENDER: 'flow:render',
  };

  constructor(tagName: string, propsAndChildren: PropsType | ChildrenType) {
    const { props, children } = this._getPropsAndChildren(propsAndChildren);

    this._element = null;
    this._meta = {
      tagName,
      props,
    };
    this._id = makeId();

    this.props = this._makePropsProxy({ ...props, _id: this._id });
    this.children = this._makePropsProxy(children); // need to make proxy?

    this._eventBus = new EventBus();
    this._registerEvents(this._eventBus);
    this._eventBus.emit(Block.EVENTS.INIT);
  }

  private _getPropsAndChildren(propsAndChildren: PropsType | ChildrenType): {
    props: PropsType;
    children: ChildrenType;
  } {
    const props: PropsType = {};
    const children: ChildrenType = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (
        value instanceof Block ||
        (Array.isArray(value) && value.every((item) => item instanceof Block))
      ) {
        children[key] = value as Block;
      } else {
        // Only assign to props if it's not a Block or Block[]
        props[key] = value;
      }
    });

    return { props, children };
  }

  private _makePropsProxy<T extends object>(props: T): T {
    /* eslint @typescript-eslint/no-this-alias:0 */

    // reference to the current Block instance for proxy
    const self = this;

    // create new proxy obj. First arg - proxied obj, second - traps
    return new Proxy<T>(props, {
      // intercept props accesses
      get(target: T, prop: string): unknown {
        // get prop in a safe way
        const value = Reflect.get(target, prop);

        // if func - bind to the target obj
        return typeof value === 'function' ? value.bind(target) : value;
      },

      // intercept props assignments
      set(target: T, prop: string, value: unknown): boolean {
        // shallow copy of the target
        const oldProps = { ...target }; // mb add deep copy

        // set prop in a safe way, return bool on success
        const success = Reflect.set(target, prop, value);

        if (success) {
          // emit 'component-did-update' event
          // "self" gives reference to current Block instance
          // else "this" will give reference to proxy obj
          self._eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, target);
        }
        return success;
      },

      // intercept attemots to del props
      deleteProperty() {
        // throw an error to prevent del
        throw new Error('нет доступа');
      },
    });
  }

  private _registerEvents(_eventBus: EventBus) {
    _eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    _eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    _eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    _eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
    _eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _init() {
    this._createResources();
    this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  private _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  private _createDocumentElement(tagName: string) {
    const el = document.createElement(tagName);
    el.setAttribute('data-id', this._id);
    return el;
  }

  private _render() {
    const hasEvents =
      this.props.events && Object.keys(this.props.events).length > 0;

    const block = this.render();
    this._element!.innerHTML = '';
    this.element?.removeAttribute('data-id');

    if (hasEvents) {
      this._removeEvents();
    }

    this._element!.appendChild(block);

    if (this.props.attr && Object.keys(this.props.attr).length > 0) {
      this._addAttributes();
    }
    if (hasEvents) {
      this._addEvents();
    }
  }

  protected render() {
    return new DocumentFragment();
  }

  protected compile(tpl: string, props: PropsType): DocumentFragment {
    const hasChildren = Object.keys(this.children).length > 0;

    let propsCopy = { ...props, ...this.children };

    if (hasChildren) {
      propsCopy = setStubs(
        this.children,
        propsCopy as PropsType | ChildrenType,
      );
    }

    const fragment = document.createElement('template');
    fragment.innerHTML = Handlebars.compile(tpl)(propsCopy);

    if (hasChildren) {
      replaceStubs(fragment, this.children);
    }

    return fragment.content;
  }

  private _addEvents() {
    Object.entries(this.props.events).forEach(([event, callback]) => {
      if (event === 'blur') {
        this._element!.addEventListener(event, callback, { capture: true });
        return;
      }
      this._element!.addEventListener(event, callback);
    });
  }

  public addEvent(event: string, callback: EventListener) {
    (this.props.events as Record<string, EventListener>)[event] = callback;
    this._element!.addEventListener(event, callback);
  }

  private _removeEvents() {
    Object.entries(this.props.events).forEach(([event, callback]) =>
      this._element!.removeEventListener(event, callback),
    );
  }

  public removeEvent(event: string) {
    const callback = (this.props.events as Record<string, EventListener>)[
      event
    ];

    this._element!.removeEventListener(event, callback);
  }

  private _addAttributes() {
    Object.entries(this.props.attr).forEach(([attr, value]) => {
      this._element!.setAttribute(attr, value);
    });
  }

  // logic after mounting
  private _componentDidMount() {
    this.componentDidMount();
  }

  // logic for subclasses
  protected componentDidMount() {}

  // call after appending to a parent container in the DOM
  // end of _render method?
  protected dispatchComponentDidMount() {
    this._eventBus.emit(Block.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach((child: Block) => {
      child.dispatchComponentDidMount();
    });
  }

  private _componentDidUpdate(
    oldProps: PropsType | ChildrenType,
    newProps: PropsType | ChildrenType,
  ) {
    const propsAreEqual = this.componentDidUpdate(oldProps, newProps);

    if (!propsAreEqual) {
      this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate(
    oldProps: PropsType | ChildrenType,
    newProps: PropsType | ChildrenType,
  ) {
    return isEqual(oldProps, newProps);
  }

  // call in removeComponent func
  protected dispatchComponentWillUnmount() {
    this._eventBus.emit(Block.EVENTS.FLOW_CWU);

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((nestedChild) =>
          nestedChild.dispatchComponentWillUnmount(),
        );
      } else {
        child.dispatchComponentWillUnmount();
      }
    });
  }

  private _componentWillUnmount() {
    this.componentWillUnmount();
    this._removeEvents();

    // clear intervals or timeouts?
    // cancel network requests?
  }

  // logic for subclasses
  protected componentWillUnmount() {}

  // call before removing?
  protected removeComponent() {
    this.dispatchComponentWillUnmount();
  }

  // remove child logic?
  protected removeChildComponent(child: Block) {
    child.dispatchComponentWillUnmount();
  }

  get element() {
    return this._element;
  }

  public getContent() {
    return this.element!;
  }

  public getId() {
    return this._id!;
  }

  public show() {
    const el = this.getContent();
    el!.classList.remove('hidden');
  }

  public hide() {
    const el = this.getContent();
    el!.classList.add('hidden');
  }
}
