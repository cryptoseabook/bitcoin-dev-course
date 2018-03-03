var bitcore = require("bitcore-lib");
var privateKey = new bitcore.PrivateKey('1'.repeat(64));

console.log("privateKey: >>> " + privateKey);
var address = privateKey.toAddress();
console.log("address: >>>" + address);

var privateKeyWIF = privateKey.toWIF();
console.log("privateKeyWIF: >>> " + privateKeyWIF);

var publicKey = privateKey.toPublicKey();

console.log("PublicKey: >>> " + publicKey)


