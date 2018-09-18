import { HttpHeaders } from '@angular/common/http';

export class ReduxHttpOptions {
  headers?: HttpHeaders | {[header: string]: string | string[]};
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}
