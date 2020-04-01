import creditCardType = require('../index');

describe('creditCardType', () => {
  it('returns an empty array if passed non-strings', () => {
    expect(creditCardType()).toEqual([]);
    expect(creditCardType(null)).toEqual([]);
    expect(creditCardType(true)).toEqual([]);
    expect(creditCardType(false)).toEqual([]);
    expect(creditCardType('ren hoek')).toEqual([]);
    expect(creditCardType(3920342)).toEqual([]);
    expect(creditCardType([])).toEqual([]);
    expect(creditCardType({})).toEqual([]);
  });

  it.each([
    ['411', 'visa'],
    ['4111111111111111', 'visa'],
    ['4012888888881881', 'visa'],
    ['4222222222222', 'visa'],
    ['4462030000000000', 'visa'],
    ['4484070000000000', 'visa'],
    ['411111111111111111', 'visa'],
    ['4111111111111111110', 'visa'],

    ['431274', 'elo'],
    ['451416', 'elo'],
    ['457393', 'elo'],
    ['401178', 'elo'],
    ['401179', 'elo'],
    ['438935', 'elo'],
    ['457631', 'elo'],
    ['457632', 'elo'],
    ['4576321111111111', 'elo'],
    ['5066991111111118', 'elo'],
    ['6277809', 'elo'],
    ['6277809990229178', 'elo'],
    ['650033', 'elo'],
    ['6500331111111111', 'elo'],

    ['2221', 'mastercard'],
    ['2222', 'mastercard'],
    ['2223', 'mastercard'],
    ['2224', 'mastercard'],
    ['2225', 'mastercard'],
    ['2226', 'mastercard'],
    ['2225', 'mastercard'],
    ['2226', 'mastercard'],
    ['223', 'mastercard'],
    ['2239', 'mastercard'],
    ['23', 'mastercard'],
    ['24', 'mastercard'],
    ['25', 'mastercard'],
    ['26', 'mastercard'],
    ['27', 'mastercard'],
    ['270', 'mastercard'],
    ['271', 'mastercard'],
    ['272', 'mastercard'],
    ['2720', 'mastercard'],

    ['51', 'mastercard'],
    ['52', 'mastercard'],
    ['53', 'mastercard'],
    ['54', 'mastercard'],
    ['55', 'mastercard'],
    ['5555555555554444', 'mastercard'],
    ['5454545454545454', 'mastercard'],

    ['34', 'american-express'],
    ['37', 'american-express'],
    ['341', 'american-express'],
    ['34343434343434', 'american-express'],
    ['378282246310005', 'american-express'],
    ['371449635398431', 'american-express'],
    ['378734493671000', 'american-express'],

    ['30', 'diners-club'],
    ['300', 'diners-club'],
    ['36', 'diners-club'],
    ['38', 'diners-club'],
    ['39', 'diners-club'],
    ['30569309025904', 'diners-club'],
    ['38520000023237', 'diners-club'],
    ['36700102000000', 'diners-club'],
    ['36148900647913', 'diners-club'],

    ['6011', 'discover'],
    ['644', 'discover'],
    ['644', 'discover'],
    ['645', 'discover'],
    ['646', 'discover'],
    ['647', 'discover'],
    ['648', 'discover'],
    ['649', 'discover'],
    ['6011000400000000', 'discover'],
    ['6011111111111117', 'discover'],
    ['6011000990139424', 'discover'],

    ['62123456789002', 'unionpay'],
    ['621234567890003', 'unionpay'],
    ['6221258812340000', 'unionpay'],
    ['622018111111111111', 'unionpay'],
    ['6212345678900000003', 'unionpay'],

    ['56', 'maestro'],
    ['57', 'maestro'],
    ['58', 'maestro'],
    ['59', 'maestro'],
    ['67', 'maestro'],
    ['6304000000000000', 'maestro'],
    ['6799990100000000019', 'maestro'],
    ['62183', 'maestro'],

    ['1', 'jcb'],
    ['35', 'jcb'],
    ['2131', 'jcb'],
    ['21312', 'jcb'],
    ['1800', 'jcb'],
    ['18002', 'jcb'],
    ['3530111333300000', 'jcb'],
    ['3566002020360505', 'jcb'],
    ['35308796121637357', 'jcb'],
    ['353445444300732639', 'jcb'],
    ['3537286818376838569', 'jcb'],

    ['6221260000000000', 'unionpay'],
    ['6221260000000000000', 'unionpay'],
    ['6222000000000000', 'unionpay'],
    ['6228000000000000', 'unionpay'],
    ['6229250000000000', 'unionpay'],
    ['6229250000000000000', 'unionpay'],
    ['6240000000000000', 'unionpay'],
    ['6260000000000000000', 'unionpay'],
    ['6282000000000000', 'unionpay'],
    ['6289000000000000000', 'unionpay'],
    ['6221558812340000', 'unionpay'],
    ['6269992058134322', 'unionpay'],
    ['622018111111111111', 'unionpay'],
    ['8', 'unionpay'],
    ['8100513433325374', 'unionpay'],
    ['8111700872004845', 'unionpay'],
    ['8141618644273338', 'unionpay'],
    ['8158163233706018', 'unionpay'],
    ['8168524506870054', 'unionpay'],

    ['220', 'mir'],
    ['2200', 'mir'],
    ['2204', 'mir'],
    ['22000000000000000', 'mir'],
    ['22049999999999999', 'mir'],

    ['6062820524845321', 'hipercard'],
    ['6062820000', 'hipercard'],
    ['6370950000000005', 'hiper'],
    ['637095', 'hiper'],
    ['637609', 'hiper'],
    ['637599', 'hiper'],
    ['637612', 'hiper'],
    ['637568', 'hiper']
  ])('Matches %s to brand %s', (number, type) => {
    const actual = creditCardType(number);

    try {
      expect(actual).toHaveLength(1);
    } catch (e) {
      console.log(actual); // eslint-disable-line no-console
      throw e;
    }
    expect(actual[0].type).toBe(type);
  });

  it.each([
    [
      '',
      [
        'visa',
        'mastercard',
        'american-express',
        'diners-club',
        'discover',
        'jcb',
        'unionpay',
        'maestro',
        'elo',
        'mir',
        'hiper',
        'hipercard'
      ]
    ],
    ['2', ['mastercard', 'jcb', 'mir']],
    ['3', ['american-express', 'diners-club', 'jcb']],
    ['5', ['mastercard', 'maestro', 'elo']],
    ['50', ['maestro', 'elo']],
    ['6', ['discover', 'unionpay', 'maestro', 'elo', 'hiper', 'hipercard']],
    ['60', ['discover', 'maestro', 'hipercard']],
    ['601', ['discover', 'maestro']],
    ['64', ['discover', 'maestro']],
    ['62', ['unionpay', 'maestro', 'elo']],

    ['4', ['visa', 'maestro', 'elo']],
    ['43', ['visa', 'elo']],
    ['431', ['visa', 'elo']],
    ['4312', ['visa', 'elo']],
    ['43127', ['visa', 'elo']],
    ['45141', ['visa', 'elo']],
    ['45739', ['visa', 'elo']],
    ['40117', ['visa', 'elo']],
    ['43893', ['visa', 'elo']],
    ['45763', ['visa', 'elo']],

    ['6277', ['unionpay', 'maestro', 'elo']],
    ['62778', ['unionpay', 'maestro', 'elo']],

    ['63', ['maestro', 'elo', 'hiper']],
    ['636', ['maestro', 'elo']],
    ['6362', ['maestro', 'elo']],
    ['63629', ['maestro', 'elo']],

    ['637', ['maestro', 'hiper']],
    ['606', ['maestro', 'hipercard']],
    ['627', ['unionpay', 'maestro', 'elo']],
    ['6062', ['maestro', 'hipercard']],
    ['6370', ['maestro', 'hiper']],
    ['6376', ['maestro', 'hiper']],
    ['6375', ['maestro', 'hiper']],
    ['65', ['discover', 'maestro', 'elo']],
    ['655', ['discover', 'maestro', 'elo']],
    ['6550', ['discover', 'maestro', 'elo']],
    ['65502', ['discover', 'maestro', 'elo']]
  ])('Matches %s to array %p', (number, expectedNames) => {
    const actualNames = creditCardType(number).map(type => type.type);

    expect(expectedNames).toEqual(actualNames);
  });

  it.each([
    '0',
    '12',
    '123',
    '181',
    '1802',
    '221',
    '222099',
    '2721',
    '212',
    '2132',
    '306',
    '31',
    '32',
    '33',
    '7',
    '9'
  ])('returns an empty array for %s', unknown => {
    expect(creditCardType(unknown)).toHaveLength(0);
  });

  it.each([
    ['Mastercard', '5454545454545454', {size: 3, name: 'CVC'}],
    ['Visa', '4111111111111111', {size: 3, name: 'CVV'}],
    ['American Express', '378734493671000', {size: 4, name: 'CID'}],
    ['Discover', '6011000990139424', {size: 3, name: 'CID'}],
    ['JCB', '30569309025904', {size: 3, name: 'CVV'}],
    ['Diners Club', '30569309025904', {size: 3, name: 'CVV'}],
    ['UnionPay', '6220558812340000', {size: 3, name: 'CVN'}],
    ['Maestro', '6304000000000000', {size: 3, name: 'CVC'}],
    ['Mir', '2200000000000000', {size: 3, name: 'CVP2'}]
  ])('returns security codes for %s', (brand, number, code) => {
    const parsedCode = creditCardType(number)[0].code;

    expect(parsedCode).toMatchObject(code);
  });

  it.each([
    [
      'Maestro',
      '6304000000000000',
      {type: 'maestro', lengths: [12, 13, 14, 15, 16, 17, 18, 19]}
    ],
    ['Diners Club', '305', {type: 'diners-club', lengths: [14, 16, 19]}],
    ['Discover', '6011', {type: 'discover', lengths: [16, 19]}],
    ['Visa', '4', {type: 'visa', lengths: [16, 18, 19]}],
    ['Mastercard', '54', {type: 'mastercard', lengths: [16]}],
    ['JCB', '35', {type: 'jcb', lengths: [16, 17, 18, 19]}],
    ['Mir', '220', {type: 'mir', lengths: [16, 17, 18, 19]}]
  ])('returns lengths for %s', (brand, number, meta) => {
    const cardType = creditCardType(number)[0];

    expect(cardType).toMatchObject(meta);
  });

  it('works for String objects', () => {
    const number = new String('4111111111111111'); // eslint-disable-line no-new-wrappers

    expect(creditCardType(number)[0].type).toBe('visa');
  });

  it('preserves integrity of returned values', () => {
    const result = creditCardType('4111111111111111')[0];

    result.type = 'whaaaaaat';
    expect(creditCardType('4111111111111111')[0].type).toBe('visa');
  });
});

describe('getTypeInfo', () => {
  it('returns type information', () => {
    const info = creditCardType.getTypeInfo(creditCardType.types.VISA);

    expect(info.type).toBe('visa');
    expect(info.niceType).toBe('Visa');
  });

  it('returns null for an unknown type', () => {
    expect(creditCardType.getTypeInfo('gibberish')).toBeNull();
  });
});

describe('resetModifications', () => {
  it('resets card removals', () => {
    const original = creditCardType('');

    creditCardType.removeCard('mastercard');

    expect(creditCardType('')).not.toEqual(original);

    creditCardType.resetModifications();

    expect(creditCardType('')).toEqual(original);
  });

  it('resets card additions', () => {
    const original = creditCardType('');

    creditCardType.addCard({
      niceType: 'NewCard',
      type: 'new-card',
      patterns: [2345],
      gaps: [4, 8, 12],
      lengths: [16],
      code: {
        name: 'cvv',
        size: 3
      }
    });

    expect(creditCardType('')).not.toEqual(original);

    creditCardType.resetModifications();

    expect(creditCardType('')).toEqual(original);
  });

  it('resets card modifications', () => {
    const original = creditCardType('');

    creditCardType.addCard({
      niceType: 'Custom Visa Nice Type',
      type: 'visa',
      patterns: [4],
      gaps: [4, 8, 12],
      lengths: [16],
      code: {
        name: 'Security Code',
        size: 3
      }
    });

    expect(creditCardType('')).not.toEqual(original);

    creditCardType.resetModifications();

    expect(creditCardType('')).toEqual(original);
  });

  it('resets order changes', () => {
    const original = creditCardType('');

    creditCardType.changeOrder('visa', 4);

    expect(creditCardType('')).not.toEqual(original);

    creditCardType.resetModifications();

    expect(creditCardType('')).toEqual(original);
  });
});

describe('removeCard', () => {
  afterEach(() => {
    creditCardType.resetModifications();
  });

  it('removes card from test order array', () => {
    let result = creditCardType('2');

    expect(result).toHaveLength(3);
    expect(result[0].type).toBe('mastercard');
    expect(result[1].type).toBe('jcb');
    expect(result[2].type).toBe('mir');

    creditCardType.removeCard('mastercard');

    result = creditCardType('2');

    expect(result).toHaveLength(2);
    expect(result[0].type).toBe('jcb');
    expect(result[1].type).toBe('mir');
  });

  it('throws an error if card type is passed which is not in the array', () => {
    expect(() => {
      creditCardType.removeCard('bogus');
    }).toThrowError('"bogus" is not a supported card type.');
  });
});

describe('addCard', () => {
  afterEach(() => {
    creditCardType.resetModifications();
  });

  it('adds new card type', () => {
    let result = creditCardType('2');

    expect(result).toHaveLength(3);
    expect(result[0].type).toBe('mastercard');
    expect(result[1].type).toBe('jcb');
    expect(result[2].type).toBe('mir');

    creditCardType.addCard({
      niceType: 'NewCard',
      type: 'new-card',
      patterns: [2345],
      gaps: [4, 8, 12],
      lengths: [16],
      code: {
        name: 'cvv',
        size: 3
      }
    });

    result = creditCardType('2');

    expect(result).toHaveLength(4);
    expect(result[0].type).toBe('mastercard');
    expect(result[1].type).toBe('jcb');
    expect(result[2].type).toBe('mir');
    expect(result[3].type).toBe('new-card');
  });

  it('can overwrite existing cards', () => {
    let result = creditCardType('4111111');

    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('visa');
    expect(result[0].niceType).toBe('Visa');
    expect(result[0].code.name).toBe('CVV');
    expect(result[0].lengths).toEqual([16, 18, 19]);

    creditCardType.addCard({
      niceType: 'Custom Visa Nice Type',
      type: 'visa',
      patterns: [4],
      gaps: [4, 8, 12],
      lengths: [16],
      code: {
        name: 'Security Code',
        size: 3
      }
    });

    result = creditCardType('4111111');

    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('visa');
    expect(result[0].niceType).toBe('Custom Visa Nice Type');
    expect(result[0].code.name).toBe('Security Code');
    expect(result[0].lengths).toEqual([16]);
  });

  it('adds new card to last position in card list', () => {
    let result = creditCardType('2');

    expect(result).toHaveLength(3);

    creditCardType.addCard({
      niceType: 'NewCard',
      type: 'new-card',
      patterns: [2345],
      gaps: [4, 8, 12],
      lengths: [16],
      code: {
        name: 'CVV',
        size: 3
      }
    });

    result = creditCardType('2');

    expect(result).toHaveLength(4);
    expect(result[3].type).toBe('new-card');

    creditCardType.addCard({
      niceType: 'NewCard 2',
      type: 'another-new-card',
      patterns: [2345],
      gaps: [4, 8, 12],
      lengths: [16],
      code: {
        name: 'CVV',
        size: 3
      }
    });

    result = creditCardType('2');

    expect(result).toHaveLength(5);
    expect(result[3].type).toBe('new-card');
    expect(result[4].type).toBe('another-new-card');
  });
});

describe('updateCard', () => {
  afterEach(() => {
    creditCardType.resetModifications();
  });

  it('throws an error if the card type does not exist', () => {
    expect(() => {
      creditCardType.updateCard('foo', {});
    }).toThrowError('"foo" is not a recognized type. Use `addCard` instead.');
  });

  it('throws an error if the type field in the updates object exists and does not match', () => {
    expect(() => {
      creditCardType.updateCard(creditCardType.types.VISA, {
        type: 'not visa'
      });
    }).toThrowError('Cannot overwrite type parameter.');
  });

  it('does not throw an error if the type field in the updates object exists and does match', () => {
    expect(() => {
      creditCardType.updateCard(creditCardType.types.VISA, {
        type: 'visa'
      });
    }).not.toThrowError();
  });

  it('updates existing card', () => {
    creditCardType.updateCard(creditCardType.types.VISA, {
      niceType: 'Fancy Visa',
      lengths: [11, 16, 18, 19]
    });

    const updatedVisa = creditCardType.getTypeInfo(creditCardType.types.VISA);

    expect(updatedVisa.niceType).toBe('Fancy Visa');
    expect(updatedVisa.lengths).toEqual([11, 16, 18, 19]);
    expect(updatedVisa.gaps).toEqual([4, 8, 12]);
    expect(updatedVisa.code).toEqual({
      name: 'CVV',
      size: 3
    });

    expect(creditCardType('4')[0].niceType).toEqual('Fancy Visa');
  });

  it('can update pattern', () => {
    creditCardType.updateCard(creditCardType.types.VISA, {
      patterns: [3]
    });

    expect(creditCardType('3')[0].type).toBe('visa');
  });

  it('can update more than once', () => {
    let updatedVisa;

    creditCardType.updateCard(creditCardType.types.VISA, {
      lengths: [11]
    });

    updatedVisa = creditCardType.getTypeInfo(creditCardType.types.VISA);

    expect(updatedVisa.lengths).toEqual([11]);
    expect(updatedVisa.niceType).toBe('Visa');

    creditCardType.updateCard(creditCardType.types.VISA, {
      niceType: 'Fancy Visa'
    });

    updatedVisa = creditCardType.getTypeInfo(creditCardType.types.VISA);

    expect(updatedVisa.niceType).toBe('Fancy Visa');
    expect(updatedVisa.lengths).toEqual([11]);
  });

  it('can update custom cards', () => {
    let card;

    creditCardType.addCard({
      niceType: 'NewCard',
      type: 'new-card',
      patterns: [2345],
      gaps: [4, 8, 12],
      lengths: [16],
      code: {
        name: 'cvv',
        size: 3
      }
    });

    card = creditCardType.getTypeInfo('new-card');

    expect(card.niceType).toBe('NewCard');

    creditCardType.updateCard(card.type, {
      niceType: 'Fancy NewCard'
    });

    card = creditCardType.getTypeInfo('new-card');

    expect(card.niceType).toBe('Fancy NewCard');
  });
});

describe('changeOrder', () => {
  afterEach(() => {
    creditCardType.resetModifications();
  });

  it('changes test order priority', () => {
    let result = creditCardType('2');

    expect(result).toHaveLength(3);
    expect(result[0].type).toBe('mastercard');
    expect(result[1].type).toBe('jcb');
    expect(result[2].type).toBe('mir');

    creditCardType.changeOrder('jcb', 0);

    result = creditCardType('2');

    expect(result).toHaveLength(3);
    expect(result[0].type).toBe('jcb');
    expect(result[1].type).toBe('mastercard');
    expect(result[2].type).toBe('mir');
  });

  it('throws an error if card type is passed which is not in the array', () => {
    expect(() => {
      creditCardType.changeOrder('bogus', 0);
    }).toThrowError('"bogus" is not a supported card type.');
  });
});

describe('types', () => {
  it('corresponds to internal type codes', () => {
    const exposedTypes = Object.keys(creditCardType.types).map(
      key => creditCardType.types[key]
    );
    const internalTypes = creditCardType('').map(entry => entry.type);

    expect(exposedTypes).toEqual(internalTypes);
  });
});
