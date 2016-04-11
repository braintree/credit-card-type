var expect = require('chai').expect;
var getCardType = require('../index');

describe('getCardType', function () {
  it('returns an empty array if passed non-strings', function () {
    expect(getCardType()).to.deep.equal([]);
    expect(getCardType(null)).to.deep.equal([]);
    expect(getCardType(true)).to.deep.equal([]);
    expect(getCardType(false)).to.deep.equal([]);
    expect(getCardType('ren hoek')).to.deep.equal([]);
    expect(getCardType(3920342)).to.deep.equal([]);
    expect(getCardType([])).to.deep.equal([]);
    expect(getCardType({})).to.deep.equal([]);
  });

  describe('matches card numbers to brand', function () {
    var tests = [
      ['4', 'visa'],
      ['411', 'visa'],
      ['4111111111111111', 'visa'],
      ['4012888888881881', 'visa'],
      ['4222222222222', 'visa'],
      ['4462030000000000', 'visa'],
      ['4484070000000000', 'visa'],

      ['2221', 'master-card'],
      ['2222', 'master-card'],
      ['2223', 'master-card'],
      ['2224', 'master-card'],
      ['2225', 'master-card'],
      ['2226', 'master-card'],
      ['2225', 'master-card'],
      ['2226', 'master-card'],
      ['23', 'master-card'],
      ['24', 'master-card'],
      ['25', 'master-card'],
      ['26', 'master-card'],
      ['270', 'master-card'],
      ['271', 'master-card'],
      ['2720', 'master-card'],

      ['51', 'master-card'],
      ['52', 'master-card'],
      ['53', 'master-card'],
      ['54', 'master-card'],
      ['55', 'master-card'],
      ['5555555555554444', 'master-card'],
      ['5454545454545454', 'master-card'],

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

      ['60', 'discover'],
      ['601', 'discover'],
      ['6011', 'discover'],
      ['64', 'discover'],
      ['644', 'discover'],
      ['65', 'discover'],
      ['644', 'discover'],
      ['645', 'discover'],
      ['646', 'discover'],
      ['647', 'discover'],
      ['648', 'discover'],
      ['649', 'discover'],
      ['6011000400000000', 'discover'],
      ['6011111111111117', 'discover'],
      ['6011000990139424', 'discover'],

      ['62', 'unionpay'],
      ['627', 'unionpay'],
      ['6221258812340000', 'unionpay'],

      ['50', 'maestro'],
      ['56', 'maestro'],
      ['57', 'maestro'],
      ['58', 'maestro'],
      ['59', 'maestro'],
      ['63', 'maestro'],
      ['67', 'maestro'],
      ['6304000000000000', 'maestro'],
      ['6799990100000000019', 'maestro'],

      ['1', 'jcb'],
      ['2', 'jcb'],
      ['35', 'jcb'],
      ['2131', 'jcb'],
      ['21312', 'jcb'],
      ['1800', 'jcb'],
      ['18002', 'jcb'],
      ['3530111333300000', 'jcb'],
      ['3566002020360505', 'jcb']
    ];

    var dualBrandTests = [
      ['6221260000000000', ['discover', 'unionpay']],
      ['6221260000000000000', ['discover', 'unionpay']],
      ['6222000000000000', ['discover', 'unionpay']],
      ['6228000000000000', ['discover', 'unionpay']],
      ['6229250000000000', ['discover', 'unionpay']],
      ['6229250000000000000', ['discover', 'unionpay']],
      ['6240000000000000', ['discover', 'unionpay']],
      ['6260000000000000000', ['discover', 'unionpay']],
      ['6282000000000000', ['discover', 'unionpay']],
      ['6289000000000000000', ['discover', 'unionpay']],
      ['6221558812340000', ['discover', 'unionpay']],
      ['6269992058134322', ['discover', 'unionpay']]
    ]


    tests.forEach(function (test) {
      var number = test[0];
      var type = test[1];

      it('returns type ' + type + ' for ' + number, function () {
        var actual = getCardType(number);
        expect(actual).to.have.lengthOf(1);
        expect(actual[0].type).to.equal(type);
      });
    });

    dualBrandTests.forEach(function (test) {
      var number = test[0];
      var types = test[1];

      it('returns type ' + types.join(', ') + ' for ' + number, function () {
        var actual = getCardType(number);
        expect(actual).to.have.lengthOf(2);
        expect(actual[0].type).to.equal(types[0]);
        expect(actual[1].type).to.equal(types[1]);
      });
    });
  });

  describe('ambiguous card types', function () {
    var ambiguous = [
      ['', ['visa', 'master-card', 'american-express', 'diners-club', 'discover', 'jcb', 'unionpay', 'maestro']],
      ['3', ['american-express', 'diners-club', 'jcb']],
      ['5', ['master-card', 'maestro']],
      ['6', ['discover', 'maestro', 'unionpay']]
    ];

    ambiguous.forEach(function (group) {
      var number = group[0];
      var expectedNames = group[1].sort();

      it('returns ' + expectedNames.join(' and ') + ' for ' + number, function () {
        var actualNames = getCardType(number).map(function (type) {
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
      '22',
      '222099',
      '2721',
      '212',
      '2132',
      '306',
      '31',
      '32',
      '33',
      '600',
      '602',
      '603',
      '604',
      '605',
      '606',
      '607',
      '608',
      '609',
      '6010',
      '6012',
      '6013',
      '6014',
      '6015',
      '6016',
      '6017',
      '6018',
      '6019',
      '61',
      '640',
      '641',
      '642',
      '643',
      '66',
      '68',
      '69',
      '7',
      '8',
      '9'
    ];

    unknowns.forEach(function (unknown) {
      it('returns an empty array for ' + unknown, function () {
        expect(getCardType(unknown)).to.have.lengthOf(0);
      });
    });
  });

  describe('returns security codes for', function () {
    it('MasterCard', function () {
      var code = getCardType('5454545454545454')[0].code;
      expect(code.size).to.equal(3);
      expect(code.name).to.equal('CVC');
    });
    it('Visa', function () {
      var code = getCardType('4111111111111111')[0].code;
      expect(code.size).to.equal(3);
      expect(code.name).to.equal('CVV');
    });
    it('American Express', function () {
      var code = getCardType('378734493671000')[0].code;
      expect(code.size).to.equal(4);
      expect(code.name).to.equal('CID');
    });
    it('Discover', function () {
      var code = getCardType('6011000990139424')[0].code;
      expect(code.size).to.equal(3);
      expect(code.name).to.equal('CID');
    });
    it('JCB', function () {
      var code = getCardType('30569309025904')[0].code;
      expect(code.size).to.equal(3);
      expect(code.name).to.equal('CVV');
    });
    it('Diners Club', function () {
      var code = getCardType('30569309025904')[0].code;
      expect(code.size).to.equal(3);
      expect(code.name).to.equal('CVV');
    });
    it('UnionPay', function () {
      var code = getCardType('6220558812340000')[0].code;
      expect(code.size).to.equal(3);
      expect(code.name).to.equal('CVN');
    });
    it('Maestro', function () {
      var code = getCardType('6304000000000000')[0].code;
      expect(code.size).to.equal(3);
      expect(code.name).to.equal('CVC');
    });
  });

  describe('returns lengths for', function () {
    it('Maestro', function () {
      expect(getCardType('6304000000000000')[0].lengths).to.deep.equal([12,13,14,15,16,17,18,19]);
    });
    it('Diners Club', function () {
      expect(getCardType('305')[0].lengths).to.deep.equal([14]);
    });
    it('Discover', function () {
      expect(getCardType('6011')[0].lengths).to.deep.equal([16, 19]);
    });
    it('Visa', function () {
      expect(getCardType('4')[0].lengths).to.deep.equal([16]);
    });
    it('MasterCard', function () {
      expect(getCardType('54')[0].lengths).to.deep.equal([16]);
    });
  });

  it('works for String objects', function () {
    var number = new String('4111111111111111');
    expect(getCardType(number)[0].type).to.equal('visa');
  });

  it('preserves integrity of returned values', function () {
    var result = getCardType('4111111111111111')[0];
    result.type = 'whaaaaaat';
    expect(getCardType('4111111111111111')[0].type).to.equal('visa');
  });
});
