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
  private _api;

  constructor(endpoint: string) {
    this._api = endpoint;
  }

  /* eslint-disable arrow-body-style */
  public get: HTTPMethod = (url, options = {}) => {
    return this._request(this._api + url, { ...options, method: METHOD.GET });
  };

  public post: HTTPMethod = (url, options = {}) => {
    return this._request(this._api + url, { ...options, method: METHOD.POST });
  };

  public put: HTTPMethod = (url, options = {}) => {
    return this._request(this._api + url, { ...options, method: METHOD.PUT });
  };

  public delete: HTTPMethod = (url, options = {}) => {
    return this._request(this._api + url, {
      ...options,
      method: METHOD.DELETE,
    });
  };

  private _request: HTTPMethod = (url, options = { method: METHOD.GET }) => {
    const { headers, method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method!, url);

      if (headers) {
        Object.entries(headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value);
        });
      } else if (!(data instanceof FormData)) {
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
        xhr.send(data instanceof FormData ? data : JSON.stringify(data));
      }
    });
  };
}
