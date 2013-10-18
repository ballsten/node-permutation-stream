var es = require('event-stream');
var async = require('async');

exports.createPermutationStream = function createPermutationStream() {
  var output = es.through();

  var input = es.split().pipe(es.writeArray(function(err, data) {
    permutate(data, 0, write, end);
  }));
  
  return es.duplex(input, output);

  function write(data) {
    output.write(data);
  }

  function end() {
    output.write(null);
  }
}

function permutate(list, i, emit, done) {
  emit(list.slice(0,i));
  if(i == list.length-1) {
    emit(list);
    done();
  } else {
    var j = i;
    async.whilst(
      function() { 
        return j < list.length 
      },
      function(cb) {
        var l = list.slice();
        l[i] = list[j], l[j] = list[i];
        j++;
        permutate(l, i+1, emit, cb);
      },
      function() {
        done();
      });
  }
}