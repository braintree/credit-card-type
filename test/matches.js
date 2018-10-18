'use strict';

var matches = require('../lib/matches');

describe('matches', function () {
  context('Array', function () {
    it('returns true if value is within range', function () {
      var range = ['123', '410'];

      expect(matches('123', range)).to.equal(true);
      expect(matches('125', range)).to.equal(true);
      expect(matches('309', range)).to.equal(true);
      expect(matches('409', range)).to.equal(true);
      expect(matches('410', range)).to.equal(true);

      expect(matches('122', range)).to.equal(false);
      expect(matches('010', range)).to.equal(false);
      expect(matches('411', range)).to.equal(false);
      expect(matches('999', range)).to.equal(false);
    });

    it('returns true if value is within range for partial match', function () {
      var range = ['123', '410'];

      expect(matches('1', range)).to.equal(true);
      expect(matches('12', range)).to.equal(true);
      expect(matches('12', range)).to.equal(true);
      expect(matches('30', range)).to.equal(true);
      expect(matches('40', range)).to.equal(true);
      expect(matches('41', range)).to.equal(true);

      expect(matches('0', range)).to.equal(false);
      expect(matches('01', range)).to.equal(false);
      expect(matches('42', range)).to.equal(false);
      expect(matches('99', range)).to.equal(false);
      expect(matches('5', range)).to.equal(false);
    });

    it('returns true if value is within range for value with more digits', function () {
      var range = ['123', '410'];

      expect(matches('1230', range)).to.equal(true);
      expect(matches('1258', range)).to.equal(true);
      expect(matches('309312123', range)).to.equal(true);
      expect(matches('409112333', range)).to.equal(true);
      expect(matches('41056789', range)).to.equal(true);

      expect(matches('1220', range)).to.equal(false);
      expect(matches('0100', range)).to.equal(false);
      expect(matches('41134567', range)).to.equal(false);
      expect(matches('99999999', range)).to.equal(false);
    });
  });

  context('Pattern', function () {
    it('returns true if value matches the pattern', function () {
      var pattern = '123';

      expect(matches('123', pattern)).to.equal(true);

      expect(matches('122', pattern)).to.equal(false);
      expect(matches('010', pattern)).to.equal(false);
      expect(matches('411', pattern)).to.equal(false);
      expect(matches('999', pattern)).to.equal(false);
    });

    it('returns true if partial value matches the pattern', function () {
      var pattern = '123';

      expect(matches('', pattern)).to.equal(true);
      expect(matches('1', pattern)).to.equal(true);
      expect(matches('12', pattern)).to.equal(true);
      expect(matches('123', pattern)).to.equal(true);

      expect(matches('0', pattern)).to.equal(false);
      expect(matches('01', pattern)).to.equal(false);
      expect(matches('124', pattern)).to.equal(false);
      expect(matches('13', pattern)).to.equal(false);
    });

    it('returns true if value matches the pattern when of greater length', function () {
      var pattern = '123';

      expect(matches('1234', pattern)).to.equal(true);
      expect(matches('1235', pattern)).to.equal(true);
      expect(matches('1236', pattern)).to.equal(true);
      expect(matches('1237123', pattern)).to.equal(true);

      expect(matches('01234', pattern)).to.equal(false);
    });
  });
});
