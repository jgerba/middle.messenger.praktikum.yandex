import { ChildrenType, PropsType } from '../core/block.ts';

type BlockType = {
  _id: string;
  getContent(): HTMLElement;
};

export function setStubs(
  children: ChildrenType,
  props: PropsType | ChildrenType,
): PropsType | ChildrenType {
  /* eslint no-param-reassign: "error" */

  Object.entries(children).forEach(([key, child]) => {
    if (Array.isArray(child)) {
      props[key] = child.map((item) => `<div data-id="${item._id}"></div>`);
    } else {
      props[key] = `<div data-id="${child._id}"></div>`;
    }
  });

  return props;
}

export function replaceStubs(
  fragment: HTMLTemplateElement,
  children: ChildrenType,
) {
  function stubHandler(child: BlockType): void {
    const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

    if (stub) {
      stub.replaceWith(child.getContent()!);
    }
  }

  Object.values(children).forEach((child) => {
    if (Array.isArray(child)) {
      child.forEach((item) => stubHandler(item));
    } else {
      stubHandler(child);
    }
  });
}
