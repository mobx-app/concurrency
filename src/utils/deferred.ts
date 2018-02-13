export default class Deferred {

  promise: Promise<any>
  resolve: Function;
  reject: Function;

  constructor() {
    this.promise = new Promise((resolve: Function, reject: Function) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }

}
