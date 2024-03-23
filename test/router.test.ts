import { expect } from 'chai';
import Router from '../src/router/router.ts';
import Block from '../src/core/block.ts';

describe('Router', () => {
  let router: Router;

  class MockBlock extends Block {
    constructor() {
      super('div', {});
    }
    render(): DocumentFragment {
      return this.compile('<p>123</p>', {});
    }
  }

  beforeEach(() => {
    router = new Router();
  });

  it('should init correctly with default route', () => {
    const mockBlock = new MockBlock();

    router.use('/', mockBlock);
    router.start();

    expect(router.getRoute('/')).to.not.be.undefined;
  });

  it('should add new route', () => {
    const mockBlock = new MockBlock();

    router.use('/', mockBlock);
    router.use('/test', mockBlock);
    router.start();
    router.go('/test');

    expect(router.getRoute('/test')).to.not.be.undefined;
  });
});
