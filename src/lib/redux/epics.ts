import { mergeMap } from 'rxjs/operators';
import { Observable, Observer } from 'rxjs';

import { combineEpics, ofType, Epic } from 'redux-observable';
import { AnyAction } from 'redux';
import { assign } from './assign';

export class NgEpic {
  type: string;
  fn: (action: AnyAction, store: any) => void | Promise<AnyAction>;
}

export function createAction(type: string, payload?: any): AnyAction {
  return { type: type, payload: payload };
}

export function convertAction(action: AnyAction): AnyAction {
  return assign(action);
}

export function generateEpics(epics: NgEpic[]) {
  const epicObservables: Epic<AnyAction, AnyAction, void, any>[] = [];

  for (const epic of epics) {
    epicObservables.push((action$, store) => {
      return action$.pipe(
        ofType(epic.type),
        mergeMap(action => {
          return Observable.create((observer: Observer<AnyAction>) => {
            const fn = (epicAction: AnyAction) => {
              observer.next(epicAction);
              observer.complete();
            };

            const response: void | Promise<AnyAction> = epic.fn(action, store);
            if (response) {
              response.then(fn).catch(fn);
            }
          });
        }));
    });
  }

  return combineEpics(...epicObservables);
}
