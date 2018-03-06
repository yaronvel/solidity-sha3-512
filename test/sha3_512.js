let Sha3_512 = artifacts.require("./SHA3_512.sol");
let BigNumber = require('bignumber.js');
let shaContract;


//helping strangers over the internet is fun!!!!!!!!!!!!!!!!!!!!!!

let string = "helping strangers over the internet is fun!!!!!!!!!!!!!!!!!!!!!!";

function parseHexString(str) {
    var result = [];
    while (str.length >= 8) {
        let num = new BigNumber(0);
        for(let i = 0 ; i < 8 ; i++) {
          let pow = new BigNumber(2).pow(8*i);
          num = num.add(new BigNumber(str.charCodeAt(i)).mul(pow));
        }
        str = str.substring(8, str.length);
        result.push(num);
    }

    return result;
}


function reverseBytes(num32){
    if(num32.length < 8) {
      num32 = "0" * (8-num32.length) + num32;
    }
    return num32.match(/[a-fA-F0-9]{2}/g).reverse().join('');
}

contract('sha3_512', function(accounts) {
    it("create new contract", async function () {
        shaContract = await Sha3_512.new();
    });

    it("calc hash", async function () {
        input = parseHexString(string);
        let result = await shaContract.hash(input);
        let resultString = "";
        for(let i = 0 ; i < result.length ; i++) {
          resultString += reverseBytes(result[i].toString(16));
        }

        // try https://emn178.github.io/online-tools/keccak_512.html
        let expectedResult = "8029b81d7b1c01460710c855651d2f44062e57fca135987a8558f30d0264e07bea1be37e759bd9059b11758be47bef473e9691526acda84089d10415e327ef7a";
        assert.equal(expectedResult,resultString,"unexpected hash result");
    });


});
