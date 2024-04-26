class CountingSet {
  private data: Map<string, number> = new Map<string, number>();
  private total = 0;

  add(element: string) {
    let count = this.data.get(element) || 0;
    this.data.set(element, count + 1);
    this.total++;
  }

  randomElement(): string {
    let index = randomInt(this.total);
    console.log("index,", index);
    console.log(this.data);
    for (let [key, count] of this.data) {
      index -= count;
      if (index <= 0) {
        return key;
      }
    }
    throw new Error("This line should never be reached");
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
