import clone from './clone';
import matches from './matches';
import type { CreditCardType } from '../types';

export default function addMatchingCardsToResults(
  cardNumber: string,
  cardConfiguration: CreditCardType,
  results: Array<object>
): void {
  let i, patternLength;

  for (i = 0; i < cardConfiguration.patterns.length; i++) {
    const pattern = cardConfiguration.patterns[i];

    if (!matches(cardNumber, pattern)) {
      continue;
    }

    const clonedCardConfiguration = clone(cardConfiguration);

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
