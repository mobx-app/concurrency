import { computed, observable } from 'mobx';
import Run from './Run';
import { Task as TaskInterface, TaskState, Strategy } from './../types/Task';

export default class Task<T> implements TaskInterface<T> {

  private _generator: () => Iterator<T> = null;
  private _state: TaskState = TaskState.Idle;
  private _strategy: Strategy = Strategy.KeepAll;

  @observable
  last: Run<T> = null;

  @observable
  lastSuccessful: Run<T> = null;

  @observable
  lastErrored: Run<T> = null;

  @observable
  lastCanceled: Run<T> = null;

  @observable
  lastComplete: Run<T> = null;

  @observable
  performCount: number = 0;

  @observable
  concurrency: number = 0;

  @computed
  get isIdle() : Boolean {
    return this._state === TaskState.Idle;
  }

  @computed
  get isRunning() : Boolean {
    return this._state === TaskState.Running;
  }

  @computed
  get isSuccessful() : Boolean {
    return this.last !== null && this.last.isSuccessful;
  }

  @computed
  get isError() : Boolean {
    return this.last !== null && this.last.isError;
  }

  constructor(generator: () => Iterator<T>) {
    this._generator = generator;
  }

  cancelAll() : void {

  }

  perform() : Run<T> {
    const iterator: Iterator<T> = this._generator();
    const run = new Run<T>(iterator);

    this.last = run;
    this.performCount++;
    this.concurrency++;

    return run;
  }

}
