export interface Run<T> {

  value: T;
  error: any;

  isSuccessful: Boolean;
  isError: Boolean;
  isQueued: Boolean;
  isRunning: Boolean;
  isCanceled: Boolean;
  isFinished: Boolean;
  hasStarted: Boolean;

  cancel() : void;
  then(handler: (result: T) => any) : Promise<T>;
  catch(handler: (error: any) => any) : Promise<T>;

}

export enum RunState {
  Queued,
  Running,
  Canceled,
  Finished
}

export enum RunResult {
  NotFinished,
  Successful,
  Errored
}

