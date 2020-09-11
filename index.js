//index.js
const crypto = require('crypto');
class Block {
   constructor(index, transaction, prevHash) {
       this.index = index;
       this.transaction = transaction;
       this.timestamp = Math.floor(Date.now() / 1000);
       this.prevHash = prevHash;
       this.hash=this.getHash();
   }

   getHash() {
       var encript=JSON.stringify(this.transaction) + this.prevHash + this.index + this.timestamp;
       var hash=crypto.createHmac('sha256', "secret")
       .update(encript)
       .digest('hex');
       return hash;
   }
}


class BlockChain {
   constructor() {
       this.chain = [];
   }

   addBlock(transaction) {
       let index = this.chain.length;
       let prevHash = this.chain.length !== 0 ? this.chain[this.chain.length - 1].hash : 0;
       let block = new Block(index, transaction, prevHash);
       this.chain.push(block);
   }

   chainIsValid(){
           for(var i=0;i<this.chain.length;i++){
               if(this.chain[i].hash !== this.chain[i].getHash())
                   return false;
               if(i > 0 && this.chain[i].prevHash !== this.chain[i-1].hash)
                   return false;
           }
           return true;
       }
}


const BChain = new BlockChain();
BChain.addBlock({sender: "Bruce wayne", reciver: "Tony stark", amount: 100});
BChain.addBlock({sender: "Harrison wells", reciver: "Han solo", amount: 50});
BChain.addBlock({sender: "Tony stark", reciver: "Ned stark", amount: 75});
console.dir(BChain,{depth:null})

console.log("La Validité de cette blockchain: ", BChain.chainIsValid());