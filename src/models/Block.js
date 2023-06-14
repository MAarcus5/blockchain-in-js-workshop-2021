import sha256 from 'crypto-js/sha256.js';
export const DIFFICULTY = 2

class Block {
  constructor(blockchain, previousHash, index, payload, coinbaseBeneficiary) {
    this.blockchain = blockchain
    this.previousHash = previousHash
    this.index = index
    this.timestamp = new Date().getTime()
    this.payload = payload
    this.nonce = 0
    this.coinbaseBeneficiary = coinbaseBeneficiary
    this.transactions = []
    this.utxoPool = this.blockchain.currentUTXOPool.clone()
    this._setHash()
  }

  isValid() {
    return this.hash.substring(0, DIFFICULTY) === '0'.repeat(DIFFICULTY)
  }

  setNonce(nonce) {
    this.nonce = nonce
    this._setHash()
  }

  _setHash() {
    this.hash = sha256(
      this.previousHash +
        this.index +
        this.timestamp +
        this.payload +
        this.nonce
    ).toString()
  }

  combinedTransactionsHash() {
    return sha256(
      this.transactions.map((transaction) => transaction.hash).join('')
    )
  }

  addTransaction(transaction) {
    if (this.utxoPool.isValidTransaction(transaction)) {
      this.utxoPool.handleTransaction(transaction)
      this.transactions.push(transaction)
      this._setHash()
    }
    
  }
}

export default Block