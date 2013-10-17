node-permutation-stream
=======================

Stream to create permutations

API
===

createPermutationStream([min])
-------------------------
Returns all permutations of at least min length

```javascript
var ps = require('permutation-stream');
var es = require('event-stream');

var s = permutationStream.createPermutationStream();
es.readArray(["hello", "world"]).pipe(process.stdout);

> hello
> world
> helloworld
> worldhello
```