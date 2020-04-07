type CardBrandId =
  | "american-express"
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

type CardBrandNiceType =
  | "American Express"
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

type CodeName = "CVV" | "CVC" | "CID" | "CVN" | "CVE" | "CVP2";

export type CreditCardType = {
  niceType?: string;
  type?: string;
  patterns?: number[] | [number[]];
  gaps?: number[];
  lengths?: number[];
  code?: {
    size?: number;
    name?: string;
  };
};

export interface CreditCardTypeWithMatchStrength extends CreditCardType {
  matchStrength?: number;
}

export interface BuiltInCreditCardType extends CreditCardType {
  niceType: CardBrandNiceType;
  type: CardBrandId;
  code: {
    size: 3 | 4;
    name: CodeName;
  };
}
