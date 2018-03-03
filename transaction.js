var bitcore = require("bitcore-lib")
var explor = require("bitcore-explorers")

var secret1 = new Buffer("seabooksecret1");
var hash1 = bitcore.crypto.Hash.sha256(secret1);
var bn1 = bitcore.crypto.BN.fromBuffer(hash1);
var privateKey1 = new bitcore.PrivateKey(bn1, 'testnet');
var address1 = privateKey1.toAddress();

console.log(address1);

var secret2 = new Buffer("seabooksecret2");
var hash2 = bitcore.crypto.Hash.sha256(secret2);
var bn2 = bitcore.crypto.BN.fromBuffer(hash2);
var privateKey2 = new bitcore.PrivateKey(bn2, 'testnet');
var address2 = privateKey2.toAddress();

console.log(address2); // n1Y3y7utYhSUswBmyjeuo5oD6N2FoU93g9



// npm install bitcore-explorers --save
var insight = new explor.Insight("testnet");

insight.getUnspentUtxos(address1, function(err, utxos){
    if (err) {

    } else {
        console.log(utxos);

        var tx = bitcore.Transaction()
        tx.from(utxos) // As many times as needed        
        tx.to(address2, 1000000) // In Satoshis 0.01 BTC
        tx.fee(100000) // In Satoshis 0.001 BTC
        tx.change(address1) // Send remaining balance back to this account
        //tx.addData() // Add metadata to the transaction
        tx.sign(privateKey1)
        tx.serialize() // Check for errors

        // Send the Bitcoin transaction to the live network
        
        insight.broadcast(tx, (error, txId) => { 
            if (error) {
                console.log(error);
            } else {
                console.log("successful broadcast: " + txId);
            }
         })
         
    }
})
