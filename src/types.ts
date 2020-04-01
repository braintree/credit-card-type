export interface CreditCardType {
  niceType?: string;
  type?: string;
  patterns?: number[] | string[] | [string[]];
  gaps?: number[] | string[];
  lengths?: number[] | string[];
  code?: { size: number; name: string };
  [x: string]: any;
}
