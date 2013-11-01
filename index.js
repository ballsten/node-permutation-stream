var es = require('event-stream');
var extend = require('extend');
var async = require('async');

exports.createPermutationStream = function createPermutationStream(data, opts) {
  opts = extend({ min: 0, max: data.length}, opts);
  var output = es.through();

  process.nextTick(function() {
    permutate(data, 0, write, end);
  });
  
  return output;

  function write(data) {
    if(data.length >= opts.min && data.length <= opts.max) output.write(data);
  }

  function end() {
    output.write(null);
  }
};

function permutate(list, i, emit, done) {
  emit(list.slice(0,i));
  if(i == list.length-1) {
    emit(list);
    done();
  } else {
    var j = i;
    async.whilst(
      function() { 
        return j < list.length;
      },
      function(cb) {
        var l = list.slice();
        l[i] = list[j];
        l[j] = list[i];
        j++;
        permutate(l, i+1, emit, cb);
      },
      function() {
        done();
      });
  }
}