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
