'use strict';

import Axios from 'axios';
import Config from 'config';

class API {
  constructor() {
    this.apiUrl = Config.apiUrl;
    this.user = null;
  }

  login() {
    window.location = `${Config.apiUrl}/login`;
  }

  logout() {
    window.location = `${Config.apiUrl}/logout`;
  }

  isLoggedIn() {
    return !!this.user;
  }

  post(args, data = '', headers) {
    const requestArgs = {
      method: 'post',
      withCredentials: true,
      headers: {},
      data,
      ...args
    };
    if (headers) {
      Object.assign(requestArgs.headers, headers);
    }

    if (requestArgs.url[0] === '/') {
      requestArgs.url = `${this.apiUrl}${requestArgs.url}`;
    }

    return Axios(requestArgs)
      .then((responseData) => responseData)
      .catch((err) => {
        if (err.status === 0) {
          throw new Error('Could not connect to server.');
        }

        throw err;
      });
  }

  request(args) {
    const requestArgs = {
      method: 'get',
      headers: {},
      withCredentials: true,
      ...args
    };

    if (requestArgs.headers) {
      requestArgs.headers = { ...args.headers };
    }

    if (requestArgs.url[0] === '/') {
      requestArgs.url = `${this.apiUrl}${requestArgs.url}`;
    }

    return Axios(requestArgs)
      .then((data) => data)
      .catch((err) => {
        if (err.status === 0) {
          throw new Error('Could not connect to server.');
        }

        throw err;
      });
  }
}

export default API;
