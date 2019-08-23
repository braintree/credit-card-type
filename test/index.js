'use strict';

var creditCardType = require('../index');

describe('creditCardType', function () {
  it('returns an empty array if passed non-strings', function () {
    expect(creditCardType()).to.deep.equal([]);
    expect(creditCardType(null)).to.deep.equal([]);
    expect(creditCardType(true)).to.deep.equal([]);
    expect(creditCardType(false)).to.deep.equal([]);
    expect(creditCardType('ren hoek')).to.deep.equal([]);
    expect(creditCardType(3920342)).to.deep.equal([]);
    expect(creditCardType([])).to.deep.equal([]);
    expect(creditCardType({})).to.deep.equal([]);
  });

  describe('matches card numbers to brand', function () {
    var tests = [
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
      ['637568', 'hiper'],

      ['507860', 'aura'],
      ['5078601529671654', 'aura']
    ];

    tests.forEach(function (test) {
      var number = test[0];
      var type = test[1];

      it('returns type ' + type + ' for ' + number, function () {
        var actual = creditCardType(number);

        try {
          expect(actual).to.have.lengthOf(1);
        } catch (e) {
          console.log(actual);
          throw e;
        }
        expect(actual[0].type).to.equal(type);
      });
    });
  });

  describe('ambiguous card types', function () {
    var ambiguous = [
      ['', ['visa', 'mastercard', 'american-express', 'diners-club', 'discover', 'jcb', 'unionpay', 'maestro', 'elo', 'mir', 'hiper', 'hipercard', 'aura']],
      ['2', ['mastercard', 'jcb', 'mir']],
      ['3', ['american-express', 'diners-club', 'jcb']],
      ['5', ['mastercard', 'maestro', 'elo', 'aura']],
      ['50', ['maestro', 'elo', 'aura']],
      ['6', ['discover', 'maestro', 'unionpay', 'elo', 'hiper', 'hipercard']],
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
      ['65', ['discover', 'elo', 'maestro']],
      ['655', ['discover', 'elo', 'maestro']],
      ['6550', ['discover', 'elo', 'maestro']],
      ['65502', ['discover', 'elo', 'maestro']],
      ['507860', ['aura']]
    ];

    ambiguous.forEach(function (group) {
      var number = group[0];
      var expectedNames = group[1].sort();

      it('returns ' + expectedNames.join(' and ') + ' for ' + number, function () {
        var actualNames = creditCardType(number).map(function (type) {
          return type.type;
        }).sort();

        expect(expectedNames).to.deep.equal(actualNames);
      });
    });
  });

  describe('unknown card types', function () {
    var unknowns = [
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
      '8',
      '9'
    ];

    unknowns.forEach(function (unknown) {
      it('returns an empty array for ' + unknown, function () {
        expect(creditCardType(unknown)).to.have.lengthOf(0);
      });
    });
  });

  describe('returns security codes for', function () {
    it('Mastercard', function () {
      var code = creditCardType('5454545454545454')[0].code;

      expect(code.size).to.equal(3);
      expect(code.name).to.equal('CVC');
    });

    it('Visa', function () {
      var code = creditCardType('4111111111111111')[0].code;

      expect(code.size).to.equal(3);
      expect(code.name).to.equal('CVV');
    });

    it('American Express', function () {
      var code = creditCardType('378734493671000')[0].code;

      expect(code.size).to.equal(4);
      expect(code.name).to.equal('CID');
    });

    it('Discover', function () {
      var code = creditCardType('6011000990139424')[0].code;

      expect(code.size).to.equal(3);
      expect(code.name).to.equal('CID');
    });

    it('JCB', function () {
      var code = creditCardType('30569309025904')[0].code;

      expect(code.size).to.equal(3);
      expect(code.name).to.equal('CVV');
    });

    it('Diners Club', function () {
      var code = creditCardType('30569309025904')[0].code;

      expect(code.size).to.equal(3);
      expect(code.name).to.equal('CVV');
    });

    it('UnionPay', function () {
      var code = creditCardType('6220558812340000')[0].code;

      expect(code.size).to.equal(3);
      expect(code.name).to.equal('CVN');
    });

    it('Maestro', function () {
      var code = creditCardType('6304000000000000')[0].code;

      expect(code.size).to.equal(3);
      expect(code.name).to.equal('CVC');
    });

    it('Mir', function () {
      var code = creditCardType('2200000000000000')[0].code;

      expect(code.size).to.equal(3);
      expect(code.name).to.equal('CVP2');
    });
  });

  describe('returns lengths for', function () {
    it('Maestro', function () {
      var cardType = creditCardType('6304000000000000')[0];

      expect(cardType.type).to.equal('maestro');
      expect(cardType.lengths).to.deep.equal([12, 13, 14, 15, 16, 17, 18, 19]);
    });

    it('Diners Club', function () {
      var cardType = creditCardType('305')[0];

      expect(cardType.type).to.equal('diners-club');
      expect(cardType.lengths).to.deep.equal([14, 16, 19]);
    });

    it('Discover', function () {
      var cardType = creditCardType('6011')[0];

      expect(cardType.type).to.equal('discover');
      expect(cardType.lengths).to.deep.equal([16, 19]);
    });

    it('Visa', function () {
      var cardType = creditCardType('4')[0];

      expect(cardType.type).to.equal('visa');
      expect(cardType.lengths).to.deep.equal([16, 18, 19]);
    });

    it('Mastercard', function () {
      var cardType = creditCardType('54')[0];

      expect(cardType.type).to.equal('mastercard');
      expect(cardType.lengths).to.deep.equal([16]);
    });

    it('JCB', function () {
      var cardType = creditCardType('35')[0];

      expect(cardType.type).to.equal('jcb');
      expect(cardType.lengths).to.deep.equal([16, 17, 18, 19]);
    });

    it('Mir', function () {
      var cardType = creditCardType('220')[0];

      expect(cardType.type).to.equal('mir');
      expect(cardType.lengths).to.deep.equal([16, 17, 18, 19]);
    });
  });

  it('works for String objects', function () {
    var number = new String('4111111111111111'); // eslint-disable-line no-new-wrappers

    expect(creditCardType(number)[0].type).to.equal('visa');
  });

  it('preserves integrity of returned values', function () {
    var result = creditCardType('4111111111111111')[0];

    result.type = 'whaaaaaat';
    expect(creditCardType('4111111111111111')[0].type).to.equal('visa');
  });
});

describe('getTypeInfo', function () {
  it('returns type information', function () {
    var info = creditCardType.getTypeInfo(creditCardType.types.VISA);

    expect(info.type).to.equal('visa');
    expect(info.niceType).to.equal('Visa');
  });

  it('returns null for an unknown type', function () {
    expect(creditCardType.getTypeInfo('gibberish')).to.equal(null);
  });
});

describe('resetModifications', function () {
  it('resets card removals', function () {
    var original = creditCardType('');

    creditCardType.removeCard('mastercard');

    expect(creditCardType('')).to.not.deep.equal(original);

    creditCardType.resetModifications();

    expect(creditCardType('')).to.deep.equal(original);
  });

  it('resets card additions', function () {
    var original = creditCardType('');

    creditCardType.addCard({
      niceType: 'NewCard',
      type: 'new-card',
      patterns: [
        2345
      ],
      gaps: [4, 8, 12],
      lengths: [16],
      code: {
        name: 'cvv',
        size: 3
      }
    });

    expect(creditCardType('')).to.not.deep.equal(original);

    creditCardType.resetModifications();

    expect(creditCardType('')).to.deep.equal(original);
  });

  it('resets card modifications', function () {
    var original = creditCardType('');

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

    expect(creditCardType('')).to.not.deep.equal(original);

    creditCardType.resetModifications();

    expect(creditCardType('')).to.deep.equal(original);
  });

  it('resets order changes', function () {
    var original = creditCardType('');

    creditCardType.changeOrder('visa', 4);

    expect(creditCardType('')).to.not.deep.equal(original);

    creditCardType.resetModifications();

    expect(creditCardType('')).to.deep.equal(original);
  });
});

describe('removeCard', function () {
  afterEach(function () {
    creditCardType.resetModifications();
  });

  it('removes card from test order array', function () {
    var result = creditCardType('2');

    expect(result).to.have.a.lengthOf(3);
    expect(result[0].type).to.equal('mastercard');
    expect(result[1].type).to.equal('jcb');
    expect(result[2].type).to.equal('mir');

    creditCardType.removeCard('mastercard');

    result = creditCardType('2');

    expect(result).to.have.a.lengthOf(2);
    expect(result[0].type).to.equal('jcb');
    expect(result[1].type).to.equal('mir');
  });

  it('throws an error if card type is passed which is not in the array', function () {
    expect(function () {
      creditCardType.removeCard('bogus');
    }).to.throw('"bogus" is not a supported card type.');
  });
});

describe('addCard', function () {
  afterEach(function () {
    creditCardType.resetModifications();
  });

  it('adds new card type', function () {
    var result = creditCardType('2');

    expect(result).to.have.a.lengthOf(3);
    expect(result[0].type).to.equal('mastercard');
    expect(result[1].type).to.equal('jcb');
    expect(result[2].type).to.equal('mir');

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

    expect(result).to.have.a.lengthOf(4);
    expect(result[0].type).to.equal('mastercard');
    expect(result[1].type).to.equal('jcb');
    expect(result[2].type).to.equal('mir');
    expect(result[3].type).to.equal('new-card');
  });

  it('can overwrite existing cards', function () {
    var result = creditCardType('4111111');

    expect(result).to.have.a.lengthOf(1);
    expect(result[0].type).to.equal('visa');
    expect(result[0].niceType).to.equal('Visa');
    expect(result[0].code.name).to.equal('CVV');
    expect(result[0].lengths).to.deep.equal([16, 18, 19]);

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

    expect(result).to.have.a.lengthOf(1);
    expect(result[0].type).to.equal('visa');
    expect(result[0].niceType).to.equal('Custom Visa Nice Type');
    expect(result[0].code.name).to.equal('Security Code');
    expect(result[0].lengths).to.deep.equal([16]);
  });

  it('adds new card to last position in card list', function () {
    var result = creditCardType('2');

    expect(result).to.have.a.lengthOf(3);

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

    expect(result).to.have.a.lengthOf(4);
    expect(result[3].type).to.equal('new-card');

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

    expect(result).to.have.a.lengthOf(5);
    expect(result[3].type).to.equal('new-card');
    expect(result[4].type).to.equal('another-new-card');
  });
});

describe('updateCard', function () {
  afterEach(function () {
    creditCardType.resetModifications();
  });

  it('throws an error if the card type does not exist', function () {
    expect(function () {
      creditCardType.updateCard('foo', {});
    }).to.throw('"foo" is not a recognized type. Use `addCard` instead.');
  });

  it('throws an error if the type field in the updates object exists and does not match', function () {
    expect(function () {
      creditCardType.updateCard(creditCardType.types.VISA, {
        type: 'not visa'
      });
    }).to.throw('Cannot overwrite type parameter.');
  });

  it('does not throw an error if the type field in the updates object exists and does match', function () {
    expect(function () {
      creditCardType.updateCard(creditCardType.types.VISA, {
        type: 'visa'
      });
    }).to.not.throw();
  });

  it('updates existing card', function () {
    var updatedVisa;

    creditCardType.updateCard(creditCardType.types.VISA, {
      niceType: 'Fancy Visa',
      lengths: [11, 16, 18, 19]
    });

    updatedVisa = creditCardType.getTypeInfo(creditCardType.types.VISA);

    expect(updatedVisa.niceType).to.equal('Fancy Visa');
    expect(updatedVisa.lengths).to.deep.equal([11, 16, 18, 19]);
    expect(updatedVisa.gaps).to.deep.equal([4, 8, 12]);
    expect(updatedVisa.code).to.deep.equal({
      name: 'CVV',
      size: 3
    });

    expect(creditCardType('4')[0].niceType).to.deep.equal('Fancy Visa');
  });

  it('can update pattern', function () {
    creditCardType.updateCard(creditCardType.types.VISA, {
      patterns: [3]
    });

    expect(creditCardType('3')[0].type).to.equal('visa');
  });

  it('can update more than once', function () {
    var updatedVisa;

    creditCardType.updateCard(creditCardType.types.VISA, {
      lengths: [11]
    });

    updatedVisa = creditCardType.getTypeInfo(creditCardType.types.VISA);

    expect(updatedVisa.lengths).to.deep.equal([11]);
    expect(updatedVisa.niceType).to.equal('Visa');

    creditCardType.updateCard(creditCardType.types.VISA, {
      niceType: 'Fancy Visa'
    });

    updatedVisa = creditCardType.getTypeInfo(creditCardType.types.VISA);

    expect(updatedVisa.niceType).to.equal('Fancy Visa');
    expect(updatedVisa.lengths).to.deep.equal([11]);
  });

  it('can update custom cards', function () {
    var card;

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

    expect(card.niceType).to.equal('NewCard');

    creditCardType.updateCard(card.type, {
      niceType: 'Fancy NewCard'
    });

    card = creditCardType.getTypeInfo('new-card');

    expect(card.niceType).to.equal('Fancy NewCard');
  });
});

describe('changeOrder', function () {
  afterEach(function () {
    creditCardType.resetModifications();
  });

  it('changes test order priority', function () {
    var result = creditCardType('2');

    expect(result).to.have.a.lengthOf(3);
    expect(result[0].type).to.equal('mastercard');
    expect(result[1].type).to.equal('jcb');
    expect(result[2].type).to.equal('mir');

    creditCardType.changeOrder('jcb', 0);

    result = creditCardType('2');

    expect(result).to.have.a.lengthOf(3);
    expect(result[0].type).to.equal('jcb');
    expect(result[1].type).to.equal('mastercard');
    expect(result[2].type).to.equal('mir');
  });

  it('throws an error if card type is passed which is not in the array', function () {
    expect(function () {
      creditCardType.changeOrder('bogus', 0);
    }).to.throw('"bogus" is not a supported card type.');
  });
});

describe('types', function () {
  it('corresponds to internal type codes', function () {
    var exposedTypes = Object.keys(creditCardType.types).map(function (key) {
      return creditCardType.types[key];
    });
    var internalTypes = creditCardType('').map(function (entry) {
      return entry.type;
    });

    expect(exposedTypes).to.deep.equal(internalTypes);
  });
});
