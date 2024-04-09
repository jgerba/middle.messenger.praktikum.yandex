import Block from '../core/block.ts';
import { PropsType, ChildrenType } from '../core/types.ts';

export function setStubs(
  children: ChildrenType,
  props: PropsType | ChildrenType,
): PropsType | ChildrenType {
  /* eslint no-param-reassign: "error" */

  Object.entries(children).forEach(([key, child]) => {
    if (Array.isArray(child)) {
      props[key] = child.map((item) => `<div data-id="${item.getId()}"></div>`);
    } else {
      props[key] = `<div data-id="${child.getId()}"></div>`;
    }
  });

  return props;
}

export function replaceStubs(
  fragment: HTMLTemplateElement,
  children: ChildrenType,
) {
  function stubHandler(child: Block): void {
    const stub = fragment.content.querySelector(`[data-id="${child.getId()}"]`);

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
