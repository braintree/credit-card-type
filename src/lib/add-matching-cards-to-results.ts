import { clone } from "./clone.js";
import { matches } from "./matches.js";
import type { CreditCardType } from "../types.js";

export function addMatchingCardsToResults(
  cardNumber: string,
  cardConfiguration: CreditCardType,
  results: Array<CreditCardType>,
): void {
  let i, patternLength;

  for (i = 0; i < cardConfiguration.patterns.length; i++) {
    const pattern = cardConfiguration.patterns[i];

    if (!matches(cardNumber, pattern)) {
      continue;
    }

    const clonedCardConfiguration = clone(cardConfiguration) as CreditCardType;

    if (Array.isArray(pattern)) {
      patternLength = String(pattern[0]).length;
    } else {
      patternLength = String(pattern).length;
    }

    if (cardNumber.length >= patternLength) {
      clonedCardConfiguration.matchStrength = patternLength;
    }

    results.push(clonedCardConfiguration);
    break;
  }
}
