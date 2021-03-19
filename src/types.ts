export type CreditCardTypeCardBrandId =
  | "american-express"
  | "dankort"
  | "diners-club"
  | "discover"
  | "elo"
  | "hiper"
  | "hipercard"
  | "jcb"
  | "maestro"
  | "mastercard"
  | "mir"
  | "unionpay"
  | "visa";

type CreditCardTypeCardBrandNiceType =
  | "American Express"
  | "Dankort"
  | "Diners Club"
  | "Discover"
  | "Elo"
  | "Hiper"
  | "Hipercard"
  | "JCB"
  | "Maestro"
  | "Mastercard"
  | "Mir"
  | "UnionPay"
  | "Visa";

type CreditCardTypeSecurityCodeLabel =
  | "CVV"
  | "CVC"
  | "CID"
  | "CVN"
  | "CVE"
  | "CVP2";

export type CreditCardType = {
  niceType: string;
  type: string;
  patterns: number[] | [number[]];
  gaps: number[];
  lengths: number[];
  code: {
    size: number;
    name: string;
  };
  matchStrength?: number;
};

export interface BuiltInCreditCardType extends CreditCardType {
  niceType: CreditCardTypeCardBrandNiceType;
  type: CreditCardTypeCardBrandId;
  code: {
    size: 3 | 4;
    name: CreditCardTypeSecurityCodeLabel;
  };
}

export interface CardCollection {
  [propName: string]: CreditCardType;
}
