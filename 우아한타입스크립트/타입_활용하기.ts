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
