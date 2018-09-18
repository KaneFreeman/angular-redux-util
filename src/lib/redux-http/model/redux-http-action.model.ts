import { ReduxHttpOptions } from './redux-http-options.model';

export class ReduxHttpAction {
  url: string;
  successAction: string;
  errorAction?: string;
  payload?: any;

  options?: ReduxHttpOptions;
}
