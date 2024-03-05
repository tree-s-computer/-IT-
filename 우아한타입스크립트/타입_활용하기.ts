// extends

interface Bank {
  financialCode: string;
  companyName: string;
  name: string;
  fullName: string;
}

interface Card {
  financialCode: string;
  companyName: string;
  name: string;
  appCartType: string;
}

type PayMethod<T> = T extends "card" ? Card : Bank;
type CartPayMethodType = PayMethod<"card">;
type BankPayMethodType = PayMethod<"bank">;

//infer
type UnpackPromise<T> = T extends Promise<infer K> p ? K : any
//UnpackPromise 타입은 제네릭으로 T를 받아 T가 Promise로 래핑된 경우라면 k를 반환하고, 
//그렇지 않으면 any를 반한한다. Promise<infer K>는 Promise 의 반환 값을 추론해 해당 값의 타입을 K로 한다는 의미이다. 

const promises = [Promise.resolve("Mark"),Promise.resolve(38)]
type Expected = UnpackPromise<typeof promises> // string | number

