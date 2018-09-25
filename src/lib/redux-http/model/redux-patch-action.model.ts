import { AnyAction } from 'redux';

import { ReduxHttpBodyAction } from './redux-http-body-action.model';
import { REDUX_PATCH } from '../redux-http.service';

export class ReduxPatchAction extends ReduxHttpBodyAction implements AnyAction {
  type: REDUX_PATCH;
}
