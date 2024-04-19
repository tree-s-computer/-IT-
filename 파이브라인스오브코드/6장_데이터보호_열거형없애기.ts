//열거형
enum TShirtSize {
  SMALL,
  MEDIUM,
  LARGE,
}

function sizeToString(s: TShirtSize) {
  if (s === TShirtSize.SMALL) return "S";
  else if (s === TShirtSize.MEDIUM) return "M";
  else if (s === TShirtSize.LARGE) return "L";
}

console.log(sizeToString(TShirtSize.SMALL)); // Outputs: "S"

//비공개 생성자
class TShirtSize2 {
  static readonly SMALL = new TShirtSize2("S");
  static readonly MEDIUM = new TShirtSize2("M");
  static readonly LARGE = new TShirtSize2("L");

  private constructor(private sizeLabel: string) {}
}

function sizeToString2(s: TShirtSize2) {
  if (s === TShirtSize2.SMALL) return "S";
  else if (s === TShirtSize2.MEDIUM) return "M";
  else if (s === TShirtSize2.LARGE) return "L";
}

console.log(sizeToString2(TShirtSize2.SMALL)); // Outputs: "S"

/*
6.5.1 타입 코드 값들을 대체하는 클래스

*/

interface SizeValue {}

class SmallValue implements SizeValue {}

class MediumValue implements SizeValue {}

class LargeValue implements SizeValue {}

class TShirtSize3 {
  static readonly SMALL = new TShirtSize3(new SmallValue());
  static readonly MEDIUM = new TShirtSize3(new MediumValue());
  static readonly LARGE = new TShirtSize3(new LargeValue());

  private constructor(private value: SizeValue) {}
}

/*
이제 TShirtSize3에 무언가를 추가할 때마다 SizeValue를 구현한 모든 클래스에 코드를 추가해 if를 제거할 수 있다.
*/
