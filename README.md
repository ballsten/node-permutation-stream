node-permutation-stream
=======================

Create a stream of permutations

API
===

createPermutationStream(data[, opts])
-------------------------
Creates a stream of permutations of the data array. Arrays are emitted by the stream.

#### opts
- min - minimum numbers of items in the output (default: 0)
- max - maximum number of items to output (default: data.length)

```javascript
var ps = require('permutation-stream');
var es = require('event-stream');

var s = ps.createPermutationStream(['hello', 'world']);
s.pipe(process.stdout);

> []
> ["hello"]
> ["world"]
> ["hello","world"]
> ["world","hello"]
```