import { AnyAction } from 'redux';

import { ReduxHttpBodyAction } from './redux-http-body-action.model';
import { REDUX_PUT } from '../redux-http.service';

export class ReduxPutAction extends ReduxHttpBodyAction implements AnyAction {
  type: REDUX_PUT;
}
