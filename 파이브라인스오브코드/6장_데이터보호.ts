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
