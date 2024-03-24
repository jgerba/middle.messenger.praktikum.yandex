import { expect } from 'chai';
import { createSandbox } from 'sinon';

import Router from './router.ts';
import Block from '../core/block.ts';

/* eslint-disable no-unused-expressions */

describe('Router', () => {
  const sandBox = createSandbox();

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

  afterEach(() => {
    sandBox.restore();
  });

  it('should init correctly with default route', () => {
    const mockBlock = new MockBlock();

    router.use('/', mockBlock);
    router.start();

    expect(router.getRoute('/')).to.not.be.undefined;
    expect(window.location.pathname).to.be.equal('/');
  });

  it('should add new route', () => {
    const mockBlock = new MockBlock();

    router.use('/', mockBlock);
    router.use('/test', mockBlock);
    router.start();
    router.go('/test');

    expect(router.getRoute('/test')).to.not.be.undefined;
  });

  it('should go to new route', () => {
    const mockBlock = new MockBlock();

    router.use('/', mockBlock);
    router.use('/test', mockBlock);
    router.start();
    router.go('/test');

    expect(window.location.pathname).to.be.equal('/test');
  });

  it('should modify window history', () => {
    const mockBlock = new MockBlock();
    const initHistoryLength = window.history.length;

    router.use('/', mockBlock);
    router.use('/test', mockBlock);
    router.use('/test2', mockBlock);
    router.start();
    router.go('/test');
    router.go('/test2');

    const updHistoryLength = window.history.length;

    expect(initHistoryLength).to.be.equal(updHistoryLength - 2);
  });
});

