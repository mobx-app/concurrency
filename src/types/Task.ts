import { Run } from './Run';

export interface Task<T> {

  last: Run<T>;
  lastSuccessful: Run<T>;
  lastErrored: Run<T>;
  lastCanceled: Run<T>;
  lastComplete: Run<T>;

  performCount: Number;
  concurrency: Number;

  isIdle: Boolean;
  isRunning: Boolean;
  isSuccessful: Boolean;
  isError: Boolean;

  cancelAll(): void;
  perform(): Run<T>;

}

export enum TaskState {
  Idle,
  Running
}

export enum Strategy {
  KeepAll,
  Restart,
  Drop,
  Enqueue,
  KeepLatest
}

