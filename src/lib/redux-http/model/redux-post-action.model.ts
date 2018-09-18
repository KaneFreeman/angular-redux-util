import { AnyAction } from 'redux';

import { ReduxHttpBodyAction } from './redux-http-body-action.model';
import { REDUX_POST } from '../redux-http.service';

export class ReduxPostAction extends ReduxHttpBodyAction implements AnyAction {
  type: REDUX_POST;
}
