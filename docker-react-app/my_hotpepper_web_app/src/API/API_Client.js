import axios from 'axios';

export default class ApiClient {
  constructor() {
    // proxy で，自作のエンドポイントで管理するため不要
    // let port = 3000;
    // let host = 'http://localhost';
    
    this._domain = ``;    
  }

  request(method, endpoint, params = null, headers = null) {
    const url = this._domain;
    // const url = this._domain + endpoint;
    // axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';

    headers = Object.assign({}, headers);

    let options = {
      url,
      method,
      headers,
      responseType: 'json',
    };

    if (method === 'GET') {
      options.params = params;
    } else {
      options.data = params;
    }

    return axios(options);
  }
}
