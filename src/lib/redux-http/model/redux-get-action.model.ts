import { AnyAction } from 'redux';

import { ReduxHttpAction } from './redux-http-action.model';
import { REDUX_GET } from '../redux-http.service';

export class ReduxGetAction extends ReduxHttpAction implements AnyAction {
  type: REDUX_GET;
}
