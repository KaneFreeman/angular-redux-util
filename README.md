# angular-redux-util
![npm](https://img.shields.io/npm/v/angular-redux-util.svg) ![npm](https://img.shields.io/npm/v/angular-redux-util/next.svg) [![CircleCI](https://circleci.com/gh/KaneFreeman/angular-redux-util.svg?style=shield)](https://circleci.com/gh/KaneFreeman/angular-redux-util)

Angular Redux Util is a helper library for using Angular 6+ applications with [Redux](https://redux.js.org/) (meant for use with [@angular-redux](https://angular-redux.github.io/store/index.html)) and [Redux Observable](https://redux-observable.js.org/). It contains a simplified Epic setup and built in generic Get and Post epics.

## Table of Contents

  * [Known Issues](#known-issues)
  * [Requirements](#requirements)
  * [Defining Redux Observable Epics](#defining-redux-observable-epics)
    * [Before](#before)
    * [After](#after)
  * [Configuring Epics in Store](#configuring-epics-in-store)
    * [Before](#before-1)
    * [After](#after-1)
  * [Redux Http Module](#redux-http-module)
    * [Getting Started](#getting-started)
    * [Get Action](#get-action)
    * [Post Action](#post-action)
    * [Example](#example)

## Peer Dependencies

|Module|Version|
|---|---|
|@angular/common|^6.0.0-rc.0 || ^6.0.0"|
|@angular/core|^6.0.0-rc.0 || ^6.0.0"|
|redux|^4.0.0"|
|redux-observable|^1.0.0"|
|redux-observable-util|^0.1.0"|
|rxjs|^6.0.0"|

Meant for use with [@angular-redux](https://angular-redux.github.io/store/index.html) ^9.0.0.

## Defining Redux Observable Epics

Angular Redux Util simplifies the setup for defining an epic, cleaning up the code for readability.

### Before
```typescript
somethingEpic = (action$, state$) =>
  action$.pipe(
    ofType(SOMETHING),
    switchMap(() =>
      this.httpClient.get<any>('/something').toPromise()
        .then(response => of({ type: SUCCESS, response }))
        .catch(error => of({ type: ERROR, response }));
    )
  );
```

### After

```typescript
@Epic(SOMETHING)
somethingEpic(action: AnyAction, state$) {
  this.httpClient.get<any>('/something').toPromise()
    .then(response => { type: SUCCESS, response })
    .catch(error => { type: ERROR, response });
}
```

### Configuring Epics in Store

Configuration of the epics is also simplified compared to the standard setup of Redux Observable. You call the generateEpics instead of combineEpics, and pass the services that contain @Epic decorators.

### Before

```typescript
const epicMiddleware = createEpicMiddleware();
this.ngRedux.configureStore(rootReducer, APP_INITIAL_STATE, epicMiddleware);
epicMiddleware.run(combineEpics(service.epic1, service.epic2));
```

### After

```typescript
const epicMiddleware = createEpicMiddleware();
this.ngRedux.configureStore(rootReducer, APP_INITIAL_STATE, epicMiddleware);
epicMiddleware.run(generateEpics(service));
```

## Redux Http Module

The Redux Http Module provide Get and Post epics ready out of the box. They take a specific payload, handle all of the http interactions, and return the results. You must provide a URL, success action (and body for POST). The error action and headers are optional. If no error action is provided, it will automatically use `GENERIC_ERROR`.

### Getting Started

To get started, we need to setup the Get and Post epics into the store:

```typescript
const epicMiddleware = createEpicMiddleware();

// Configure @angular-redux
this.ngRedux.configureStore(
  rootReducer,
  APP_INITIAL_STATE,
  [
    ...middleware,
    epicMiddleware
  ],
  [ ...enhancers, devTool.isEnabled() ? devTool.enhancer() : f => f]);

epicMiddleware.run(
  generateEpics(reduxHttpService)
);
```

### Get Action

**Type**: `REDUX_GET`

**Action Format**:

```typescript
export class ReduxGetPayload {
  url: string;
  successAction: string;
  errorAction?: string;
  headers?: { [key: string]: string | string[] };
}
```

### Post Action

**Type**: `REDUX_GET`

**Action Format**:

```typescript
export class ReduxPostPayload {
  url: string;
  data: any;
  successAction: string;
  errorAction?: string;
  headers?: { [key: string]: string | string[] };
}
```

### Example

```typescript
getData(): void {
  const payload: ReduxGetPayload = {
    url: 'assets/data.json',
    successAction: ExampleReduxActions.GET_DATA_SUCCESS
  };

  this.ngRedux.dispatch(createAction(REDUX_GET, payload));
}
```
