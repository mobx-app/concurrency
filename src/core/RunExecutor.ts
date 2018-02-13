import { observable } from 'mobx';
import { RunState, RunResult } from './../types/Run';
import Deferred from './../utils/deferred';

export default class RunExecutor<T> {

  private iterator: Iterator<T> = null;
  private lastIterationResult: any = null;
  private deferred = new Deferred();

  @observable
  state: RunState = RunState.Queued;

  @observable
  result: RunResult = RunResult.NotFinished;

  @observable
  value: T = null;

  @observable
  error: any = null;

  constructor(iterator: Iterator<T>) {
    this.iterator = iterator;
  }

  start() : Promise<T> {
    this.state = RunState.Running;
    this.executeIteration();
    return this.deferred.promise;
  }

  cancel() : void {
    this.state = RunState.Canceled;
    this.deferred.reject(new Error('Task execution has been cancelled'));
  }

  private executeIteration() : void {
    if (this.state === RunState.Canceled) return;

    const result: IteratorResult<T> = this.iterator.next(this.lastIterationResult);

    this.lastIterationResult = result.value;

    if (result.done) {
      this.state = RunState.Finished;
      this.result = RunResult.Successful;
      this.value = result.value;
      this.deferred.resolve(result.value);
    } else if (isPromise(this.lastIterationResult)) {
      this.lastIterationResult
        .then(() => this.executeIteration())
        .catch(error => this.handleError(error));
    } else {
      this.executeIteration();
    }
  }

  private handleError(error: any) : void {
    this.result = RunResult.Errored;
    this.state = RunState.Finished;
    this.error = error;
    this.deferred.reject(error);
  }

}

function isPromise(target: any) : Boolean {
  return target && typeof target.then === 'function' && typeof target.catch === 'function';
}
