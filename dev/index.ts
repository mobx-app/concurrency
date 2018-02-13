import * as mobxApp from '../src/index';
import * as mobx from 'mobx';

import { task, timeout, Task } from '../src/index';

window['mobxApp'] = mobxApp;
window['mobx'] = mobx;

class Test {

  testTask: Task<any> = task<any>(function* () {
    for(let i = 0; i < 10; i++) {
      yield timeout(1000);
      console.log(i);
      yield timeout(500);
      console.log('-----------')
    }
    return 10;
  })

}

let test = new Test();

test.testTask.perform();

window['test'] = test;

