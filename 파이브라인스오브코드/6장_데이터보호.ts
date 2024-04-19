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

// 순서 강제화 예제 1 : 문자열을 출력하기 전에 대문자로 표시되는지 확인하는 방법

function print(str: string): void {
  // str은 대문자여야함
  console.log(str);
}

class CapitalizedString {
  //내부 변형 예제
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

class CapitalizedString2 {
  //외부 예제
  public value: string;

  constructor(str: string) {
    this.value = this.capitalize(str);
  }

  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
}

function print(str: CapitalizedString2) {
  console.log(str.value);
}

/*
마지막으로 실행되어야 하는 메서드에 데이터 캡슐화를 적용한다.
생성자가 첫 번째 메서드를 호출하도록 한다.
두 메서드의 인자가 연결되어 있으면 이러한 인자를 필드로 만들고 메서드에서 제거한다.
*/

/*
순서 강제화 예제 2: 돈을 받는 사람의 잔고에서 금액을 더하기 전에,
항상 보낸 사람의 잔고에서 먼저 금액을 빼야 한다고 생각해본다.

따라서 순서는
1. 금액의 음수값으로 deposit을 호출한 후, 
2. 금액의 양수 값으로 deposit을 호출해야 한다.
*/

class Database {
  static updateOne(accountId: string, update: any) {
    console.log(`계좌 ${accountId} 업데이트 내용:`, update);
  }

  static find(accountName: string): string {
    console.log(`${accountName} 계좌를 찾는 중`);
    return "mockAccountId123";
  }
}

function deposit(to: string, amount: number) {
  let accountId = Database.find(to);
  Database.updateOne(accountId, { $inc: { balance: amount } });
}

class Transfer {
  constructor(from: string, amount: number) {
    this.deposit(from, -amount);
  }

  deposit(to: string, amount: number) {
    let accountId = Database.find(to);
    Database.updateOne(accountId, { $inc: { balance: amount } });
  }
}
/*
이제 송금자 측의 계좌에서 음수의 amount 로 deposit이 먼저 호출 된다는 것을 보증 할 수 있다.
더 개선 할 수 있다. amount 인자를 필드로 만들고 deposit 메서드에서 amount를 제거하여 두 amount를 연결할 수 있다.
*/

class Transfer2 {
  constructor(from: string, private amount: number) {
    this.depositHelper(from, -this.amount);
  }

  private depositHelper(to: string, amount: number) {
    let accountId = Database.find(to);
    Database.updateOne(accountId, { $inc: { balance: amount } });
  }

  deposit(to: string) {
    this.depositHelper(to, this.amount);
  }
}

/*
출금 없이 입금 될 수 없다는 것을 보증 할 수 있게 되었지만 
수취인 (to) 을 인자로 deposit을 호출 하는 것을 잊어버리면 돈이 그냥 사라질 수 있다.
따라서 입금도 반드시 발생하도록 이 클래스를 다른 클래스로 감쌀 수도 있다.
*/

class BankTransaction {
  private transfer: Transfer2;

  constructor(from: string, to: string, amount: number) {
    if (from === to) {
      throw new Error("송금자와 수취인이 동일할 수 없습니다.");
    }
    this.transfer = new Transfer2(from, amount);
    this.transfer.deposit(to);
  }
}

const banck = new BankTransaction("seorim", "eunjung", 5000);
