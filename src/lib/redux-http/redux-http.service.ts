import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {
  ReduxHttpAction, ReduxGetAction, ReduxPostAction, ReduxPutAction, ReduxPatchAction, ReduxDeleteAction,
  ReduxHttpSuccessAction, ReduxHttpErrorAction
} from './model';

import { NgEpic } from '../redux';

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
  @NgEpic(REDUX_GET)
  get(action: ReduxGetAction) {
    action.options.headers = this.buildHeader(action.options.headers);

    return this.httpClient.get<any>(action.url, action.options)
      .toPromise()
      .then(response => this.fnThen(response, action.payload))
      .catch(error => this.fnCatch(error, action.payload));
  }

  @NgEpic(REDUX_POST)
  post(action: ReduxPostAction) {
    action.options.headers = this.buildHeader(action.options.headers);

    return this.httpClient.post<any>(action.url, action.body, action.options)
      .toPromise()
      .then(response => this.fnThen(response, action.payload))
      .catch(error => this.fnCatch(error, action.payload));
  }

  @NgEpic(REDUX_POST)
  put(action: ReduxPutAction) {
    action.options.headers = this.buildHeader(action.options.headers);

    return this.httpClient.put<any>(action.url, action.body, action.options)
      .toPromise()
      .then(response => this.fnThen(response, action.payload))
      .catch(error => this.fnCatch(error, action.payload));
  }

  @NgEpic(REDUX_POST)
  patch(action: ReduxPatchAction) {
    action.options.headers = this.buildHeader(action.options.headers);

    return this.httpClient.patch<any>(action.url, action.body, action.options)
      .toPromise()
      .then(response => this.fnThen(response, action.payload))
      .catch(error => this.fnCatch(error, action.payload));
  }

  @NgEpic(REDUX_POST)
  delete(action: ReduxDeleteAction) {
    action.options.headers = this.buildHeader(action.options.headers);

    return this.httpClient.delete<any>(action.url, action.options)
      .toPromise()
      .then(response => this.fnThen(response, action.payload))
      .catch(error => this.fnCatch(error, action.payload));
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

  private buildHeader(headers: HttpHeaders| { [key: string]: string | string[] }): HttpHeaders {
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
