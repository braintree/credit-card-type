var expect = require('chai').expect;
var getCardType = require('../index');

describe('getCardType', function () {

  it('returns an empty array if passed nothing', function () {
    expect(getCardType()).to.deep.equal([]);
  });

  it('returns an empty array if passed garbage', function () {
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

      ['51', 'master-card'],
      ['52', 'master-card'],
      ['53', 'master-card'],
      ['54', 'master-card'],
      ['55', 'master-card'],
      ['5555555555554444', 'master-card'],
      ['5454545454545454', 'master-card'],

      ['34', 'american-express'],
      ['37', 'american-express'],
      ['34343434343434', 'american-express'],
      ['378282246310005', 'american-express'],
      ['371449635398431', 'american-express'],
      ['378734493671000', 'american-express'],

      ['300', 'diners-club'],
      ['30569309025904', 'diners-club'],
      ['38520000023237', 'diners-club'],
      ['36700102000000', 'diners-club'],
      ['36148900647913', 'diners-club'],

      ['6011', 'discover'],
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
      ['6221558812340000', 'unionpay'],
      ['6269992058134322', 'unionpay'],

      ['50', 'maestro'],
      ['56', 'maestro'],
      ['57', 'maestro'],
      ['58', 'maestro'],
      ['59', 'maestro'],
      ['6012', 'maestro'],
      ['6019', 'maestro'],
      ['61', 'maestro'],
      ['63', 'maestro'],
      ['66', 'maestro'],
      ['67', 'maestro'],
      ['68', 'maestro'],
      ['69', 'maestro'],
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

    tests.forEach(function (test) {
      var number = test[0];
      var type = test[1];

      it('returns type ' + type + ' for ' + number, function () {
        var actual = getCardType(number);
        expect(actual).to.have.lengthOf(1);
        expect(actual[0].type).to.equal(type);
      });
    });
  });

  describe('ambiguous card types', function () {
    var ambiguous = [
      ['3', ['american-express', 'diners-club', 'jcb']],
      ['5', ['master-card', 'maestro']],
      ['6', ['discover', 'maestro', 'unionpay']]
        /// TODO MORE OF THESE
      // '30',
      // '306',
      // '60',
      // '601',
      // '64',
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
    it('DinersClub', function () {
      var code = getCardType('30569309025904')[0].code;
      expect(code.size).to.equal(3);
      expect(code.name).to.equal('CVV');
    });
    it('UnionPay', function () {
      var code = getCardType('6221558812340000')[0].code;
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
    it('DinersClub', function () {
      expect(getCardType('305')[0].lengths).to.deep.equal([14]);
    });
    it('Discover', function () {
      expect(getCardType('6011')[0].lengths).to.deep.equal([16]);
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
    var result = getCardType('4111111111111111');
    result.type = 'whaaaaaat';
    expect(getCardType('4111111111111111')[0].type).to.equal('visa');
  });
});
