var bitcore = require("bitcore-lib");

const { randomBytes } = require('crypto')
const secp256k1 = require('secp256k1')
var CryptoJS = require('crypto-js')

// or require('secp256k1/elliptic')
//   if you want to use pure js implementation in node

// generate message to sign
const privateKey = "6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b"
const privateKeyBuffer = new Buffer(privateKey, "hex");

console.log(privateKeyBuffer);

// generate privKey
let privKey
do {
  privKey = privateKeyBuffer
} while (!secp256k1.privateKeyVerify(privKey))

// get the public key in a compressed format
const compressedPubKey = secp256k1.publicKeyCreate(privKey)
const unCompressedPubKey = secp256k1.publicKeyCreate(privKey, false)

console.log("UnCompressedPubKey: >>" + unCompressedPubKey.toString('hex'));
console.log("Compressed: >>" + compressedPubKey.toString('hex'));


// run sh256

var hashBN = bitcore.crypto.Hash.sha256(unCompressedPubKey);
var hash = hashBN.toString("hex");

var ripemd160Hex = CryptoJS.RIPEMD160(hashBN).toString();
console.log(ripemd160Hex);

//00000000550f7c7c5e9edb0d697815bf657e14ea0ebb89cb550f7c7c

//000CBB3EEBA6C4805531B18A1D27957FBA561F86894EEAE53D

//03fdf4907810a9f5d9462a1ae09feee5ab205d32798b0ffcc379442021f84c5bbf9E6E84D9