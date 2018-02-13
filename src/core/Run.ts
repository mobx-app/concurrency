import { computed } from 'mobx';
import { Run as RunInterface, RunState, RunResult } from './../types/Run';
import RunExecutor from './RunExecutor';

export default class Run<T> implements RunInterface<T> {

  private _executor: RunExecutor<T>;
  private _promise: Promise<T>;

  @computed
  get value() : T {
    return this._executor.value;
  }

  @computed
  get error() : any {
    return this._executor.error;
  }

  @computed
  get isSuccessful() : Boolean {
    return this._executor.result === RunResult.Successful;
  }

  @computed
  get isError() : Boolean {
    return this._executor.result === RunResult.Errored;
  }

  @computed
  get isQueued() : Boolean {
    return this._executor.state === RunState.Queued;
  }

  @computed
  get isRunning() : Boolean {
    return this._executor.state === RunState.Running;
  }

  @computed
  get isCanceled() : Boolean {
    return this._executor.state === RunState.Canceled;
  }

  @computed
  get isFinished() : Boolean {
    return this._executor.state === RunState.Finished;
  }

  @computed
  get hasStarted() : Boolean {
    return this._executor.state !== RunState.Queued;
  }

  constructor(iterator: Iterator<T>) {
    this._executor = new RunExecutor(iterator);
    this._promise = this._executor.start();
  }

  cancel() : void {
    this._executor.cancel();
  }

  then(handler: (result: T) => any) : Promise<T> {
    return this._promise.then(handler);
  }

  catch(handler: (error: any) => any) : Promise<T> {
    return this._promise.catch(handler);
  }

}
