/* eslint no-shadow:0 */
/* eslint @typescript-eslint/no-unused-vars:0 */

enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

/* eslint @typescript-eslint/no-explicit-any:0 */
// Предварительная версия, в дальнейшем, по мере "взросления" приложения, от any избавлюсь
type Options = {
  method: METHOD;
  data?: any;
  headers?: Record<string, string>;
};
type OptionsWithoutMethod = Omit<Options, 'method'>;

class HTTPTransport {
  _api = 'someAPI';

  get(
    url: string,
    options: OptionsWithoutMethod = {},
  ): Promise<XMLHttpRequest> {
    return this.request(this._api + url, { ...options, method: METHOD.GET });
  }

  post(
    url: string,
    options: OptionsWithoutMethod = {},
  ): Promise<XMLHttpRequest> {
    return this.request(this._api + url, { ...options, method: METHOD.POST });
  }

  put(
    url: string,
    options: OptionsWithoutMethod = {},
  ): Promise<XMLHttpRequest> {
    return this.request(this._api + url, { ...options, method: METHOD.PUT });
  }

  delete(
    url: string,
    options: OptionsWithoutMethod = {},
  ): Promise<XMLHttpRequest> {
    return this.request(this._api + url, { ...options, method: METHOD.DELETE });
  }

  /* eslint class-methods-use-this:0 */
  request(
    url: string,
    options: Options = { method: METHOD.GET },
  ): Promise<XMLHttpRequest> {
    const { headers, method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      if (headers) {
        Object.entries(headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value);
        });
      }

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
  }
}
