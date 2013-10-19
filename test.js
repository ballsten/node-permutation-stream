var expect = require('chai').expect;
var es = require('event-stream');

var ps = require('./index');

describe('permutation streams', function() {
  it('should return all permutations for two words', function(done) {
    var s = ps.createPermutationStream(["hello", "world"]);
    s.pipe(es.writeArray(function(err, data) {
      var expected = [ [], ["hello"], ["world"], ["hello", "world"], ["world", "hello"] ];
      expect(data.sort()).to.eql(expected.sort());
      done();
    }));
  });

  it('should return all permutations for 3 words', function(done) {
    var s = ps.createPermutationStream(["hello", "world", "one" ]);
    s.pipe(es.writeArray(function(err, data) {
      var expected = [ [], 
        ["hello"], ["world"], ["one"],
        ["hello", "world"], ["hello", "one"],
        ["world", "hello"], ["world", "one"],
        ["one", "world"], ["one", "hello"],
        ["hello", "world", "one"], ["hello", "one", "world"], 
        ["world", "hello", "one"], ["world", "one", "hello"], 
        ["one", "world", "hello"], ["one", "hello", "world"]
      ];
      expect(data.sort()).to.eql(expected.sort());
      done();
    }));
  });
});