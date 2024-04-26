// "도달성"이라는 용어는 코드의 특정 지점이 실행될 수 있는지 여부를 컴파일러가 판단하는 능력을 의미

class Impossible {}

class CountingSet {
  // 원소와 그 개수를 저장하는 맵
  private data: Map<string, number> = new Map<string, number>();
  // 전체 원소의 수
  private total = 0;

  // 원소를 추가하는 메서드
  add(element: string) {
    let count = this.data.get(element);
    if (count === undefined) {
      count = 0; // 해당 원소가 처음 추가되는 경우
    }
    this.data.set(element, count + 1); // 원소의 개수 증가
    this.total++; // 전체 원소의 수 증가
  }

  // 임의의 원소를 반환하는 메서드
  randomElement(): string {
    let index = Math.floor(Math.random() * this.total); // 0 이상 total 미만의 무작위 숫자 생성
    console.log("index", index);

    for (let key of this.data.keys()) {
      index -= this.data[key]; // 각 원소의 개수만큼 인덱스 감소
      if (index <= 0) {
        return key; // 인덱스가 0 이하가 되면 해당 키 반환
      }
    }
    throw new Impossible();
  }
}

// 사용 예
const mySet = new CountingSet();
mySet.add("apple");
mySet.add("banana");
mySet.add("apple");

console.log(mySet.randomElement()); // "apple"이나 "banana" 중 하나를 무작위로 반환
