import type { CreditCardType } from "../types";

type FakeCreditCardTypeOptions = Partial<CreditCardType>;

export function createFakeCreditCardType(
  options: FakeCreditCardTypeOptions = {}
): CreditCardType {
  const defaultOptions = {
    niceType: "Nice Type",
    type: "type",
    patterns: [1],
    gaps: [4],
    lengths: [16],
    code: {
      size: 3,
      name: "CVV",
    },
  };

  return {
    ...defaultOptions,
    ...options,
  };
}
