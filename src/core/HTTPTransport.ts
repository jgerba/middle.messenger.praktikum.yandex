/* eslint no-shadow:0 */
/* eslint @typescript-eslint/no-unused-vars:0 */

enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type Options = {
  method?: METHOD;
  data?: unknown;
  headers?: Record<string, string>;
  credentials?: boolean;
};
type HTTPMethod = (url: string, options?: Options) => Promise<unknown>;

export default class HTTPTransport {
  _api;

  constructor(endpoint: string) {
    this._api = endpoint;
  }

  /* eslint-disable arrow-body-style */
  get: HTTPMethod = (url, options = {}) => {
    return this.request(this._api + url, { ...options, method: METHOD.GET });
  };

  post: HTTPMethod = (url, options = {}) => {
    return this.request(this._api + url, { ...options, method: METHOD.POST });
  };

  put: HTTPMethod = (url, options = {}) => {
    return this.request(this._api + url, { ...options, method: METHOD.PUT });
  };

  delete: HTTPMethod = (url, options = {}) => {
    return this.request(this._api + url, { ...options, method: METHOD.DELETE });
  };

  request: HTTPMethod = (url, options = { method: METHOD.GET }) => {
    const { headers, method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method!, url);

      if (headers) {
        Object.entries(headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value);
        });
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      /* eslint func-names:0 */
      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
