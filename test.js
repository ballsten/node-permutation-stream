var expect = require('chai').expect;
var es = require('event-stream');

var ps = require('./index');

describe('permutation streams', function() {
  it('should return all permutations', function(done) {
    var s = ps.createPermutationStream();
    es.readArray(["hello", "world"]).pipe(s).pipe(es.writeArray(function(err, data) {
      var expected = [ "hello", "world", "helloworld", "worldhello"];
      expect(data.sort).to.eql(expected.sort());
    }));
  });
});