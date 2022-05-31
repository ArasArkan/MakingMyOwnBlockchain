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
}
