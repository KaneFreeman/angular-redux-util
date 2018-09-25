import { AnyAction } from 'redux';

export interface ReduxHttpSuccessAction extends AnyAction {
  payload?: any;
  response: any;
}
