// 맵드 타입
type Example = { a: number; b: string; c: boolean };
type Subset<T> = { [K in keyof T]?: T[K] };

// keyof : 객체 형태의 타입을, 따로 속성들만 뽑아 모아 유니온 타입으로 만들어주는 연산자

// keyof T: T 타입의 모든 프로퍼티 키들의 유니온 타입을 생성.
// 예를 들어, keyof { a: number; b: string }는 "a" | "b"가 된다.
// 따라서, Subset<T>는 T 타입의 각 프로퍼티에 대해 옵셔널 프로퍼티를 생성하는 맵드 타입을 정의한다.
// 예를 들어, Subset<Example>은 { a?: number; b?: string; c?: boolean }와 같이 된다.
// 이는 Example 타입의 모든 프로퍼티를 가지되, 각각을 옵셔널로 만든 새로운 타입을 생성한다.

const aExample: Subset<Example> = { a: 3 };
const bExample: Subset<Example> = { b: "hello" };
const cExample: Subset<Example> = { a: 4, c: true, b: "hello" };

// 맵드 타입 : readonly 속성
type ReadOnlyEx = { readonly a: number; readonly b: string };

type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};

type ResultType = CreateMutable<ReadOnlyEx>; // { a:number, b: string }

//제네릭

// ### 에러발생
const arrowExampeFunction = <T>(arg: T): T[] => {
  return new Array(3).fill(arg);
};

// ### 에러발생 x
const arrowExampeFunction2 = <T extends {}>(arg: T): T[] => {
  return new Array(3).fill(arg);
};
