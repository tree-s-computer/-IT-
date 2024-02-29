// 교차 타입을 사용할 때 타입이 서로 호환되지 않는 경우
type IdType = string | number;
type Numeric = number | boolean;
type Universal = IdType & Numeric;

// 먼저 유니버설 타입을 다음과 같이 4가지로 생각해 볼 수 있다.
// 1. string 이면서 number 인 경우
// 2. string 이면서 boolean 인 경우
// 3. number 이면서 number 인 경우
// 4. number 이면서 boolean 인 경우
