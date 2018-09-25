import { AnyAction } from 'redux';

export interface ReduxHttpErrorAction extends AnyAction {
  error: string;
}
