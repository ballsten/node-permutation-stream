var expect = require('chai').expect;
var es = require('event-stream');

var ps = require('./index');

describe('permutation streams with default options', function() {
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

describe('permutations streams with min/max options', function() {
  it('should return all permutations with 2 or more items', function(done) {
    var s = ps.createPermutationStream(["hello", "world", "one" ], { min: 2 });
    s.pipe(es.writeArray(function(err, data) {
      var expected = [
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

  it('should return all permutations with 2 or less items', function(done) {
    var s = ps.createPermutationStream(["hello", "world", "one" ], { max: 2 });
    s.pipe(es.writeArray(function(err, data) {
      var expected = [ [], 
        ["hello"], ["world"], ["one"],
        ["hello", "world"], ["hello", "one"],
        ["world", "hello"], ["world", "one"],
        ["one", "world"], ["one", "hello"]
      ];
      expect(data.sort()).to.eql(expected.sort());
      done();
    }));
  });

  it('should return all permutations with between 1 and 2 items', function(done) {
    var s = ps.createPermutationStream(["hello", "world", "one", "beep" ], { min: 1, max: 2 });
    s.pipe(es.writeArray(function(err, data) {
      var expected = [
        ["hello"], ["world"], ["one"], ["beep"],
        ["hello", "world"], ["hello", "one"], ["hello", "beep"], 
        ["world", "hello"], ["world", "one"], ["world", "beep"],
        ["one", "world"], ["one", "hello"], ["one", "beep"],
        ["beep", "hello"], ["beep", "world"], ["beep", "one"]
      ];
      expect(data.sort()).to.eql(expected.sort());
      done();
    }));
  });
});