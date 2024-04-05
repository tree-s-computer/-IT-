// 컴포지션
interface BirdComposite {
  hasBeak(): boolean;
  canFly(): boolean;
}

class CommonBirdComposite implements BirdComposite {
  hasBeak(): boolean {
    return true;
  }

  canFly(): boolean {
    return true;
  }
}

class PenguinComposite implements BirdComposite {
  private bird = new CommonBirdComposite(); // 컴포지션을 통한 CommonBird의 인스턴스 생성

  hasBeak(): boolean {
    return this.bird.hasBeak(); // CommonBird의 hasBeak 메서드 호출
  }

  canFly(): boolean {
    return false; // Penguin에 특화된 구현으로, 펭귄은 날 수 없음
  }

  canSwim() {
    return false;
  }
}
