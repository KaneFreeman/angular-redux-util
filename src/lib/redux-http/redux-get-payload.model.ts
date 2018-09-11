export class ReduxGetPayload {
  url: string;
  successAction: string;
  errorAction?: string;
  headers?: { [key: string]: string | string[] };
  payload?: any;
}
