/*
도달성 이라는 용어는 코드의 특정 지점이 실행될 수 있는지 여부를
컴파일러가 판단하는 능력을 의미한다.
*/

class Impossible {}

class CountingSet {
  private data: Map<string, number> = new Map<string, number>();
  private total = 0;
  /*
컴파일러는 total 이 데이터 구조에서 총 멤버의 수라는 것을 알지 못하기 때문에, 
항상 멤버가 선택되어 반환된다는 것을 알지 못한다.
이것은 클래스의 모든 메서드가 종료될 때 참이 유지되는 불변속성이다.
 */

  add(element: string) {
    let count = this.data.get(element) || 0;
    this.data.set(element, count + 1);
    this.total++;
  }

  randomElement(): string {
    let index = randomInt(this.total);
    console.log("index,", index);
    console.log(this.data);
    for (let key of this.data.keys()) {
      index -= this.data.get(key);
      if (index <= 0) {
        return key;
      }
    }
    throw new Impossible();
  }
}

function randomInt(max: number) {
  return Math.floor(Math.random() * max);
}

// 인스턴스 생성 및 원소 추가
const mySet = new CountingSet();
mySet.add("apple");
mySet.add("apple");
mySet.add("apple");
mySet.add("banana");
mySet.add("cherry");
mySet.add("cherry");

console.log(mySet.randomElement()); // 예: "banana", "apple", 또는 "cherry"

/*

문제의 근본적인 이유

CountingSet 클래스에서 total 변수는 모든 원소의 총 개수를 나타낸다.
이 값은 원소가 추가될 때마다 증가하며, 이를 통해 randomElement() 메서드에서 무작위 원소를 선택하는 데 필요한 인덱스 범위를 결정한다.
문제는 total 값이 데이터 구조 내의 실제 원소의 개수를 정확히 반영하지 않을 수 있다는 점이다. 
만약 원소를 제거하는 기능(remove 함수 등)이 추가되고, 그 과정에서 total을 감소시키는 것을 잊어버린다면, total 값은 실제보다 클 수 있다. 
이 경우 randomElement() 메서드에서는 존재하지 않는 원소를 찾으려고 하게 될 수 있다.

*/
