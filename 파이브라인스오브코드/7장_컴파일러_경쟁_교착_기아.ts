/*
7.10 경쟁 상태에 대한 의사 코드: 
두 개 이상의 스레드가 공유하는 변수를 읽고 쓰기 위해 경쟁할 때 발생한다.
이때 일어날 수 있는 일은 두 스레드가 업데이트 하기 위해 동시에 동일한 값을 읽는 것이다.
*/

class Counter implements Runnable {
  private static number = 0;
  run() {
    for (let i = 0; i < 10; i++) {
      console.log(this.number);
    }
  }
}

let a = new Thread(new Counter());
let b = new Thread(new Counter());

a.start();
b.start();

/*
7.12 교착 상태에 대한 의사 코드: 
두 스레드가 모두 잠겨 있고 계속 진행하기 전에 서로가 잠금 해제를 기다리고 있다.
이에 대한 일반적인 비유는 두 사람이 하나의 출입구에서 마주쳐 상대방이 먼저 통과해야 한다고 주장하는 것이다.
*/

class Counter2 implements Runnable {
  private static number = 0;
  constructor(private mine: Lock, private other: Lock) {}
  run() {
    for (let i = 0; i < 10; i++) {
      mine.lock();
      other.waitFor();
      console.log(this.number++);
      mine.free();
    }
  }
}

let aLock = new Lock();
let bLock = new Lock();

let a2 = new Thread(new Counter2(aLock, bLock));
let b2 = new Thread(new Counter2(bLock, aLock));

a2.start();
b2.start();

/*
7.14 기아에 대한 의사 코드
여기서 문제는 b가 실행될 수 없다는 것이다.
이런 상황은 매우 드물지만 기술적으로 가능하며, 이를 기아 상태라고 한다.
*/

class Printer implements Runnable {
  constructor(private name: string, private mine: Lock, private other: Lock) {}

  run() {
    while (true) {
      other.waitFor();
      mine.Lock();
      console.log(this.name);
      mine.free();
    }
  }
}
let a3 = new Thread(new Printer("A", aLock, bLock));
let b3 = new Thread(new Printer("B", bLock, aLock));

a3.start();
b3.start();

/*
결론: ..최선의 조언은 데이터를 공유한느 다중 스레드를 사용하지 말라는 것이다.
*/
