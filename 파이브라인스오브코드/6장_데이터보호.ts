// 데이터 보호

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

// 순서 강제화
function print(str: string): void {
  // str은 대문자여야함
  console.log(str);
}

class CapitalizedString {
  private value: string;

  constructor(str: string) {
    this.value = this.capitalize(str);
  }

  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  public print(): void {
    // 불변속성이 제거됨
    console.log(this.value);
  }
}

// Example usage
const myString = new CapitalizedString("hello");
myString.print(); // Outputs: Hello
