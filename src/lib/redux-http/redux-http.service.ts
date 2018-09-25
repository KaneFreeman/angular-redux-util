import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Epic } from 'redux-observable-util';
import { Observable } from 'rxjs';

import {
  ReduxHttpAction, ReduxGetAction, ReduxPostAction, ReduxPutAction, ReduxPatchAction, ReduxDeleteAction,
  ReduxHttpSuccessAction, ReduxHttpErrorAction, ReduxHttpOptions
} from './model';

export type REDUX_GET = 'REDUX_GET';
export type REDUX_POST = 'REDUX_POST';
export type REDUX_PATCH = 'REDUX_PATCH';
export type REDUX_DELETE = 'REDUX_DELETE';
export type REDUX_PUT = 'REDUX_PUT';

export const REDUX_GET: REDUX_GET = 'REDUX_GET';
export const REDUX_POST: REDUX_POST = 'REDUX_POST';
export const REDUX_PATCH: REDUX_PATCH = 'REDUX_PATCH';
export const REDUX_DELETE: REDUX_DELETE = 'REDUX_DELETE';
export const REDUX_PUT: REDUX_PUT = 'REDUX_PUT';

export const GENERIC_ERROR = 'GENERIC_ERROR';

@Injectable()
export class ReduxHttpService {
  @Epic(REDUX_GET)
  get(action: ReduxGetAction) {
    action.options = this.buildOptions(action.options);

    return this.handleResponse(this.httpClient.get<any>(action.url, action.options), action);
  }

  @Epic(REDUX_POST)
  post(action: ReduxPostAction) {
    action.options = this.buildOptions(action.options);

    return this.handleResponse(this.httpClient.post<any>(action.url, action.body, action.options), action);
  }

  @Epic(REDUX_POST)
  put(action: ReduxPutAction) {
    action.options = this.buildOptions(action.options);

    return this.handleResponse(this.httpClient.put<any>(action.url, action.body, action.options), action);
  }

  @Epic(REDUX_POST)
  patch(action: ReduxPatchAction) {
    action.options = this.buildOptions(action.options);

    return this.handleResponse(this.httpClient.patch<any>(action.url, action.body, action.options), action);
  }

  @Epic(REDUX_POST)
  delete(action: ReduxDeleteAction) {
    action.options = this.buildOptions(action.options);

    return this.handleResponse(this.httpClient.delete<any>(action.url, action.options), action);
  }

  private handleResponse(obs: Observable<any>, action: ReduxHttpAction): Promise<ReduxHttpSuccessAction | ReduxHttpErrorAction> {
    return obs
      .toPromise()
      .then(response => this.fnThen(response, action))
      .catch(error => this.fnCatch(error, action));
  }

  private fnThen(response: any, action: ReduxHttpAction): ReduxHttpSuccessAction {
    return { type: action.successAction, payload: action.payload, response };
  }

  private fnCatch(error: any, action: ReduxHttpAction): ReduxHttpErrorAction {
    return {
      type: action.errorAction ? action.errorAction : GENERIC_ERROR,
      payload: action.payload,
      error
    };
  }

  private buildOptions(options: ReduxHttpOptions|undefined): ReduxHttpOptions {
    if (options === undefined) {
      options = new ReduxHttpOptions();
    }

    options.headers = this.buildHeader(options.headers);

    return options;
  }

  private buildHeader(headers: HttpHeaders|{ [key: string]: string | string[] }): HttpHeaders {
    if (!(headers instanceof HttpHeaders)) {
      headers = new HttpHeaders(headers);
    }

    headers.append('Content-Type', 'application/json');

    // OAuth Support
    if (sessionStorage.getItem('token')) {
      headers.append('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    }

    return headers;
  }

  constructor(private httpClient: HttpClient) { }
}
