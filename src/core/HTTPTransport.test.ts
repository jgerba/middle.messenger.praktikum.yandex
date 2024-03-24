import { expect } from 'chai';
import { createSandbox } from 'sinon';

import HTTPTransport from './HTTPTransport.ts';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-expressions */
/* eslint-disable func-names */

describe('HTTP Transport', () => {
  const sandBox = createSandbox();
  let http: HTTPTransport;
  let xhrMock: any;

  beforeEach(() => {
    http = new HTTPTransport('https://example.org');
    xhrMock = {
      open: sandBox.stub(),
      setRequestHeader: sandBox.stub(),
      send: sandBox.stub().callsFake(function (this: any) {
        this.onload();
      }),
      withCredentials: false,
      responseType: '',
    };
    global.XMLHttpRequest = sandBox.stub().returns(xhrMock) as any;
  });

  afterEach(() => {
    sandBox.restore();
  });

  it('should be called with the correct arguments (GET query)', async () => {
    await http.get('/user');

    expect(xhrMock.open.calledWith('GET', 'https://example.org/user')).to.be
      .true;
  });

  it('should send GET query with the correct data', async () => {
    await http.get('/user');

    expect(xhrMock.send.called).to.be.true;
  });

  it('should be called with the correct arguments (POST query)', async () => {
    const data = {
      login: 'Login',
      password: 'Password555',
    };

    await http.post('/signin', { data });

    expect(xhrMock.open.calledWith('POST', 'https://example.org/signin')).to.be
      .true;
  });

  it('should send POST query with the correct data', async () => {
    const data = {
      login: 'Login',
      password: 'Password555',
    };

    await http.post('/signin', { data });

    expect(xhrMock.send.calledWith(JSON.stringify(data))).to.be.true;
  });

  it('should be called with the correct arguments (DELETE query)', async () => {
    const data = {
      chatId: 10,
    };

    await http.delete('/chats', { data });

    expect(xhrMock.open.calledWith('DELETE', 'https://example.org/chats')).to.be
      .true;
  });

  it('should send DELETE query with the correct data', async () => {
    const data = {
      chatId: 10,
    };

    await http.delete('/chats', { data });

    expect(xhrMock.send.calledWith(JSON.stringify(data))).to.be.true;
  });

  it('should be called with the correct arguments (PUT query)', async () => {
    const formData = new global.FormData();
    formData.append('avatar', 'inputFiles');
    formData.append('chatId', '2');

    await http.put('/chats', { data: formData });

    expect(xhrMock.open.calledWith('PUT', 'https://example.org/chats')).to.be
      .true;
  });

  it('should send PUT query with the correct data', async () => {
    const formData = new global.FormData();
    formData.append('avatar', 'inputFiles');
    formData.append('chatId', '2');

    await http.put('/chats', { data: formData });

    expect(xhrMock.send.calledWith(formData)).to.be.true;
  });
});

