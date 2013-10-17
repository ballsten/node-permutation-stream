var expect = require('chai').expect;
var es = require('event-stream');
var concat = require('concat');

var ps = require('./index');

describe('permutation streams', function() {
  it('should return all permutations', function(done) {
    var s = ps.createPermutationStream();
    es.readArray(["hello", "world"]).pipe(s).pipe(concat(function(data) {
      var expected = [ "hello", "world", "helloworld", "worldhello"];
      expect(data.sort).to.eql(expected.sort());
    }));
  });
});