import Block from '../core/block';
import { ChildrenType } from '../core/block';
import { PropsType } from '../core/block';

export function setStubs(
    children: ChildrenType,
    props: PropsType | ChildrenType
): PropsType | ChildrenType {
    Object.entries(children).forEach(([key, child]) => {
        if (Array.isArray(child)) {
            props[key] = child.map(item => `<div data-id="${item._id}"></div>`);
        } else {
            props[key] = `<div data-id="${child._id}"></div>`;
        }
    });

    return props;
}

export function replaceStubs(
    fragment: HTMLTemplateElement,
    children: ChildrenType
) {
    function stubHandler(child: Block): void {
        const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

        if (stub) {
            stub.replaceWith(child.getContent()!);
        }
    }

    Object.values(children).forEach(child => {
        if (Array.isArray(child)) {
            child.forEach(item => stubHandler(item));
        } else {
            stubHandler(child);
        }
    });
}
