class Counter {
  private counter = 0;

  getCounter() {
    return this.counter;
  }

  setCounter(c: number) {
    this.counter = c;
  }
}

const counter = new Counter();

function incrementCounter(counter: Counter) {
  //   counter++;
  counter.setCounter(counter.getCounter() + 1);
}

function main() {
  for (let index = 0; index < 20; index++) {
    incrementCounter(counter);
    console.log(counter);
  }
}

/* 변경전 코드
 let counter = 0;

function incrementCounter() {
  counter++;
}

function main() {
  for (let i = 0; i < 20; i++) {
    incrementCounter();
    console.log(counter);
  }
}

main();  // Calling the
 */
