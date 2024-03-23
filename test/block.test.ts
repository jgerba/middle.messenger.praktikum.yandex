import { expect } from 'chai';

import Block from '../src/core/block.ts';

describe('Block', () => {
  const childProps = { name: 'Test Child Block' };
  class ChildMockBlock extends Block {
    constructor() {
      super('p', childProps);
    }
    render(): DocumentFragment {
      return this.compile('{{name}}', childProps);
    }
  }

  const childBlock = new ChildMockBlock();

  const props = { name: 'Test Block', childBlock, events: {} };
  class MockBlock extends Block {
    constructor() {
      super('div', props);
    }
    render(): DocumentFragment {
      return this.compile('<p>{{name}}</p>', props);
    }
  }

  const block = new MockBlock();

  it('should initialize props correctly', () => {
    const noChildrenProps = (({ childBlock, ...rest }) => rest)(props);
    const noIdBlockProps = (({ _id, ...rest }) => rest)(block.props);

    expect(noIdBlockProps).to.deep.equal(noChildrenProps);
  });

  it('should initialize children correctly', () => {
    expect(block.children.childBlock).to.deep.equal(childBlock);
  });

  it('should render element', () => {
    expect(block._element!.innerHTML).to.equal('<p>Test Block</p>');
  });

  it('should add events', () => {
    let isClicked = false;
    block.addEvent('click', () => (isClicked = true));

    block._element!.click();

    expect(isClicked).to.be.true;
  });
});
