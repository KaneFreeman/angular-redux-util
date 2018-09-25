import { AnyAction } from 'redux';

import { ReduxHttpAction } from './redux-http-action.model';
import { REDUX_DELETE } from '../redux-http.service';

export class ReduxDeleteAction extends ReduxHttpAction implements AnyAction {
  type: REDUX_DELETE;
}
