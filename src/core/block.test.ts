import { expect } from 'chai';

import Block from './block.ts';

/* eslint max-classes-per-file: ["error", { "ignoreExpressions": true,"max": 2 }] */
/* eslint-disable @typescript-eslint/no-unused-vars */

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
    /* eslint-disable-next-line no-shadow */
    const noChildrenProps = (({ childBlock, ...rest }) => rest)(props);
    const noIdBlockProps = (({ _id, ...rest }) => rest)(block.props);

    expect(noIdBlockProps).to.deep.equal(noChildrenProps);
  });

  it('should initialize children correctly', () => {
    expect(block.children.childBlock).to.deep.equal(childBlock);
  });

  it('should render element', () => {
    expect(block.getContent().innerHTML).to.equal('<p>Test Block</p>');
  });

  it('should add events', () => {
    let isClicked = false;
    block.addEvent('click', () => {
      isClicked = true;
    });

    block.getContent().click();

    /* eslint-disable-next-line no-unused-expressions */
    expect(isClicked).to.be.true;
  });
});
