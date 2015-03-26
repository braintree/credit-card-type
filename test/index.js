var expect = require('chai').expect;
var getCardType = require('../index');

describe('getCardType', function () {

  it('returns an empty object if passed nothing', function () {
    expect(getCardType()).to.deep.equal({});
  });

  it('returns an empty object if passed garbage', function () {
    expect(getCardType('ren hoek')).to.deep.equal({});
    expect(getCardType(3920342)).to.deep.equal({});
    expect(getCardType([])).to.deep.equal({});
    expect(getCardType({})).to.deep.equal({});
  });

  describe('matches card numbers to brand', function () {
    var tests = [
      ['4111111111111111', 'visa'],
      ['4012888888881881', 'visa'],
      ['4222222222222', 'visa'],
      ['4462030000000000', 'visa'],
      ['4484070000000000', 'visa'],

      ['5555555555554444', 'master-card'],
      ['5454545454545454', 'master-card'],

      ['378282246310005', 'american-express'],
      ['371449635398431', 'american-express'],
      ['378734493671000', 'american-express'],

      ['30569309025904', 'diners-club'],
      ['38520000023237', 'diners-club'],
      ['36700102000000', 'diners-club'],
      ['36148900647913', 'diners-club'],

      ['6011111111111117', 'discover'],
      ['6011000990139424', 'discover'],

      ['3530111333300000', 'jcb'],
      ['3566002020360505', 'jcb']
    ];

    tests.forEach(function (test) {
      var number = test[0];
      var type = test[1];

      it('returns type ' + type + ' for ' + number + '', function () {
        var expected = {type: type};
        var actual = getCardType(number);
        expect(actual.type).to.equal(expected.type);
      });
    });
  });

  describe('returns security codes for', function () {
    it('MasterCard', function () {
      expect(getCardType('5454545454545454').code.size).to.equal(3);
      expect(getCardType('5454545454545454').code.name).to.equal('CVC');
    });
    it('Visa', function () {
      expect(getCardType('4111111111111111').code.size).to.equal(3);
      expect(getCardType('4111111111111111').code.name).to.equal('CVV');
    });
    it('American Express', function () {
      expect(getCardType('378734493671000').code.size).to.equal(4);
      expect(getCardType('378734493671000').code.name).to.equal('CID');
    });
    it('Discover', function () {
      expect(getCardType('6011000990139424').code.size).to.equal(3);
      expect(getCardType('6011000990139424').code.name).to.equal('CID');
    });
    it('JCB', function () {
      expect(getCardType('30569309025904').code.size).to.equal(3);
      expect(getCardType('30569309025904').code.name).to.equal('CVV');
    });
    it('DinersClub', function () {
      expect(getCardType('3530111333300000').code.size).to.equal(3);
      expect(getCardType('3530111333300000').code.name).to.equal('CVV');
    });
  });

  describe('returns empty for', function () {
    it('bad card', function () {
      expect(getCardType('Foo')).to.deep.equal({});
    });
  });

  it('works for String objects', function () {
    var number = new String('4111111111111111');
    expect(getCardType(number).type).to.equal('visa');
  });

  it('preserves integrity of returned values', function () {
    var result = getCardType('4111111111111111');
    result.type = 'whaaaaaat';
    expect(getCardType('4111111111111111').type).to.equal('visa');
  });
});
