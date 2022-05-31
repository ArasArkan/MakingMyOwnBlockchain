const SHA256 = require('crypto-js/sha256');


class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calcHash();
  }

  calcHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data)
    ).toString();
  }
}

class Chain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block
    (
      0,
       "31/05/2022",
      "01010100 01101000 01101001 01110011 00100000 01101001 01110011 00100000 01100001 00100000 01100111 01100101 01101110 01100101 01110011 01101001 01110011 00100000 01100010 01101100 01101111 01100011 01101011 00100000 01101001 00100000 01100001 01101101 00100000 01110010 01100101 01100001 01101100 01101100 01111001 00100000 01100101 01111000 01100011 01101001 01110100 01100101 01100100",
      "0"
    );
  }

  getLatestBlock(){
    return this.chain[this.chain.length - 1];
  }

  AddBlock(newBlock){
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calcHash();
    this.chain.push(newBlock);
  }

  isChainValid(){
    for(let i = 1; i < this.chain.length; i++){
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if(currentBlock.hash !== currentBlock.calcHash()){
        return false;
      }

      if(currentBlock.previousHash !== previousBlock.hash){
        return false;
      }
    }
    return true;
  } 

}

let Coin = new Chain();
Coin.AddBlock(new Block(1,"31/05/2022", { amount: 4 }));
Coin.AddBlock(new Block(2,"31/05/2022", { amount: 10 }));

console.log(Coin.isChainValid());

Coin.chain[1].data = { amount: 100 };
Coin.chain[1].hash = Coin.chain[1].calcHash();

console.log(Coin.isChainValid()); 