import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AnyAction } from 'redux';

import { ReduxGetPayload } from './redux-get-payload.model';
import { ReduxPostPayload } from './redux-post-payload.model';

import { assign, NgEpic } from '../redux';

export const REDUX_GET = 'REDUX_GET';
export const REDUX_POST = 'REDUX_POST';
export const GENERIC_ERROR = 'GENERIC_ERROR';

@Injectable()
export class ReduxHttpService {
  reduxGet: NgEpic = {
    type: REDUX_GET,
    fn: (action: AnyAction) => {
      const payload: ReduxGetPayload = action.payload;
      const headers = this.buildHeader(payload.headers);

      return this.httpClient.get<any>(payload.url, { headers: headers })
        .toPromise()
        .then(response => this.fnThen(response, payload))
        .catch(error => this.fnCatch(error, payload));
    }
  };

  reduxPost: NgEpic = {
    type: REDUX_POST,
    fn: (action: AnyAction) => {
      const payload: ReduxPostPayload = action.payload;
      const headers = this.buildHeader(payload.headers);

      return this.httpClient.post<any>(payload.url, payload.data, { headers: headers })
        .toPromise()
        .then(response => this.fnThen(response, payload))
        .catch(error => this.fnCatch(error, payload));
    }
  };

  private fnThen(response: any, payload: ReduxGetPayload): AnyAction {
    return { type: payload.successAction, payload: assign({}, payload.payload, response) };
  }

  private fnCatch(error: any, payload: ReduxGetPayload): AnyAction {
    return {
      type: payload.errorAction ? payload.errorAction : GENERIC_ERROR,
      payload: assign({}, payload.payload, error)
    };
  }

  private buildHeader(additionalHeaders: { [key: string]: string | string[] }): { [key: string]: string | string[] } {
    const headers: { [key: string]: string } = {
      'Content-Type': 'application/json'
    };

    // OAuth Support
    if (sessionStorage.getItem('token')) {
      headers['Authorization'] = 'Bearer ' + sessionStorage.getItem('token');
    }

    return assign({}, headers, additionalHeaders);
  }

  constructor(private httpClient: HttpClient) { }
}
