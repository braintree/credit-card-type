import cardTypes = require("./lib/card-types");
import { addMatchingCardsToResults } from "./lib/add-matching-cards-to-results";
import { isValidInputType } from "./lib/is-valid-input-type";
import { findBestMatch } from "./lib/find-best-match";
import { clone } from "./lib/clone";
import type {
  CreditCardType,
  CardCollection,
  CreditCardTypeCardBrandId,
} from "./types";

let customCards = {} as CardCollection;

const cardNames: Record<string, CreditCardTypeCardBrandId> = {
  VISA: "visa",
  MASTERCARD: "mastercard",
  AMERICAN_EXPRESS: "american-express",
  DINERS_CLUB: "diners-club",
  DISCOVER: "discover",
  JCB: "jcb",
  UNIONPAY: "unionpay",
  MAESTRO: "maestro",
  ELO: "elo",
  MIR: "mir",
  HIPER: "hiper",
  HIPERCARD: "hipercard",
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
  cardNames.HIPERCARD,
];

let testOrder = clone(ORIGINAL_TEST_ORDER) as string[];

function findType(cardType: string | number): CreditCardType {
  return customCards[cardType] || cardTypes[cardType];
}

function getAllCardTypes(): CreditCardType[] {
  return testOrder.map(
    (cardType) => clone(findType(cardType)) as CreditCardType
  );
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

function creditCardType(cardNumber: string): Array<CreditCardType> {
  const results = [] as CreditCardType[];

  if (!isValidInputType(cardNumber)) {
    return results;
  }

  if (cardNumber.length === 0) {
    return getAllCardTypes();
  }

  testOrder.forEach((cardType) => {
    const cardConfiguration = findType(cardType);

    addMatchingCardsToResults(cardNumber, cardConfiguration, results);
  });

  const bestMatch = findBestMatch(results) as CreditCardType;

  if (bestMatch) {
    return [bestMatch];
  }

  return results;
}

creditCardType.getTypeInfo = (cardType: string): CreditCardType =>
  clone(findType(cardType)) as CreditCardType;

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
  updates: Partial<CreditCardType>
): void => {
  const originalObject = customCards[cardType] || cardTypes[cardType];

  if (!originalObject) {
    throw new Error(
      `"${cardType}" is not a recognized type. Use \`addCard\` instead.'`
    );
  }

  if (updates.type && originalObject.type !== updates.type) {
    throw new Error("Cannot overwrite type parameter.");
  }

  let clonedCard = clone(originalObject) as CreditCardType;

  clonedCard = { ...clonedCard, ...updates };

  customCards[clonedCard.type] = clonedCard;
};

creditCardType.changeOrder = (name: string, position: number): void => {
  const currentPosition = getCardPosition(name);

  testOrder.splice(currentPosition, 1);
  testOrder.splice(position, 0, name);
};

creditCardType.resetModifications = (): void => {
  testOrder = clone(ORIGINAL_TEST_ORDER) as string[];
  customCards = {};
};

creditCardType.types = cardNames;

export = creditCardType;
