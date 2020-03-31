import types from './lib/card-types';
import addMatchingCardsToResults from './lib/add-matching-cards-to-results';
import isValidInputType from './lib/is-valid-input-type';
import findBestMatch from './lib/find-best-match';
import clone from './lib/clone';

export interface CreditCardType {
  niceType?: string;
  type?: string;
  patterns?: number[] | string[] | [string[]];
  gaps?: number[] | string[];
  lengths?: number[] | string[];
  code?: { size: number; name: string };
  [x: string]: any;
}

let testOrder;
let customCards = {};

const cardNames = {
  VISA: 'visa',
  MASTERCARD: 'mastercard',
  AMERICAN_EXPRESS: 'american-express',
  DINERS_CLUB: 'diners-club',
  DISCOVER: 'discover',
  JCB: 'jcb',
  UNIONPAY: 'unionpay',
  MAESTRO: 'maestro',
  ELO: 'elo',
  MIR: 'mir',
  HIPER: 'hiper',
  HIPERCARD: 'hipercard'
};

const ORIGINAL_TEST_ORDER = [
  cardNames.VISA,
  cardNames.MASTERCARD,
  cardNames.AMERICAN_EXPRESS,
  cardNames.DINERS_CLUB,
  cardNames.DISCOVER,
  cardNames.JCB,
  cardNames.UNIONPAY,
  cardNames.MAESTRO,
  cardNames.ELO,
  cardNames.MIR,
  cardNames.HIPER,
  cardNames.HIPERCARD
];

testOrder = clone(ORIGINAL_TEST_ORDER);

function findType(type: string | number): CreditCardType {
  return customCards[type] || types[type];
}

function getAllCardTypes(): CreditCardType[] {
  return testOrder.map(type => clone(findType(type)));
}

function getCardPosition(
  name: string,
  ignoreErrorForNotExisting = false
): number {
  const position = testOrder.indexOf(name);

  if (!ignoreErrorForNotExisting && position === -1) {
    throw new Error('"' + name + '" is not a supported card type.');
  }

  return position;
}

function creditCardType(cardNumber = null): Array<CreditCardType> {
  const results = [];

  if (!isValidInputType(cardNumber)) {
    return [];
  }

  if (cardNumber.length === 0) {
    return getAllCardTypes();
  }

  testOrder.forEach(type => {
    const cardConfiguration = findType(type);

    addMatchingCardsToResults(cardNumber, cardConfiguration, results);
  });

  const bestMatch = findBestMatch(results);

  if (bestMatch) {
    return [bestMatch];
  }

  return results;
}

creditCardType.getTypeInfo = (type: string): CreditCardType =>
  clone(findType(type));

creditCardType.removeCard = (name: string): void => {
  const position = getCardPosition(name);

  testOrder.splice(position, 1);
};

creditCardType.addCard = (config: CreditCardType): void => {
  const existingCardPosition = getCardPosition(config.type, true);

  customCards[config.type] = config;

  if (existingCardPosition === -1) {
    testOrder.push(config.type);
  }
};

creditCardType.updateCard = (
  cardType: string,
  updates: CreditCardType
): void => {
  const originalObject = customCards[cardType] || types[cardType];

  if (!originalObject) {
    throw new Error(
      `"${cardType}" is not a recognized type. Use \`addCard\` instead.'`
    );
  }

  if (updates.type && originalObject.type !== updates.type) {
    throw new Error('Cannot overwrite type parameter.');
  }

  const clonedCard = clone(originalObject);

  Object.keys(clonedCard).forEach(key => {
    if (updates[key]) {
      clonedCard[key] = updates[key];
    }
  });

  customCards[clonedCard.type] = clonedCard;
};

creditCardType.changeOrder = (name: string, position: number): void => {
  const currentPosition = getCardPosition(name);

  testOrder.splice(currentPosition, 1);
  testOrder.splice(position, 0, name);
};

creditCardType.resetModifications = (): void => {
  testOrder = clone(ORIGINAL_TEST_ORDER);
  customCards = {};
};

creditCardType.types = cardNames;

export default creditCardType;
