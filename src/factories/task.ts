import Task from '../core/Task';

export function task<T>(operator: () => Iterator<T>) : Task<T> {
  return new Task(operator);
}
