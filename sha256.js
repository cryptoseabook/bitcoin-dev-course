var bitcore = require("bitcore-lib");

var value = new Buffer('1');
var hashBN = bitcore.crypto.Hash.sha256(value);
var hash = bitcore.crypto.BN.fromBuffer(hashBN);


console.log(hash);
