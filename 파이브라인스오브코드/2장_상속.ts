// 상속

interface Bird {
  hasBeak(): boolean;
  canFly(): boolean;
}

class CommonBird implements Bird {
  hasBeak(): boolean {
    return true;
  }

  canFly(): boolean {
    return true;
  }
}

// 상속을 사용하여 CommonBird로부터 파생
class Penguin extends CommonBird {
  // Penguin 클래스에서 canFly 메서드를 오버라이드
  canFly(): boolean {
    return false;
  }
}
