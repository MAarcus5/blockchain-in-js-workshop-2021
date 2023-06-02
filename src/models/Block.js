import sha256 from 'crypto-js/sha256.js'

export const DIFFICULTY = 2

class Block {
  constructor(blockchain, previousHash, index, data, coinbaseBeneficiary) {
    this.blockchain = blockchain
    this.previousHash = previousHash
    this.timestamp = new Date().getTime()
    this.index = index
    this.data = data
    this.nonce = 0
    this.difficulty = DIFFICULTY
    this.coinbaseBeneficiary = coinbaseBeneficiary
    this.hash = this.calculateHash()
    this.utxoPool = blockchain.utxoPool.clone()
    this.utxoPool.addUTXO(coinbaseBeneficiary, 12.5)
  }

  calculateHash() {
    return sha256(
      this.previousHash +
        this.timestamp +
        JSON.stringify(this.data) +
        this.nonce
    ).toString()
  }

  isValid() {
    return this.hash.substring(0, this.difficulty) === '0'.repeat(this.difficulty)
  }

  setNonce(nonce) {
    this.nonce = nonce
    this.hash = this.calculateHash()
  }
}

export default Block
