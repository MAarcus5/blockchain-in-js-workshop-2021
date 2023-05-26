import sha256 from 'crypto-js/sha256.js';

export const DIFFICULTY = 2

class Block {
  constructor(blockchain, prevHash, height, data, miner = null) {
    this.blockchain = blockchain
    this.prevHash = prevHash
    this.height = height
    this.hash = sha256(height + prevHash + data).toString()
    this.nonce = 0
    this.data = data
    this.miner = miner
    this.utxoPool = blockchain.utxoPool.clone()

    if (miner) {
      this.utxoPool.addUTXO(miner, 12.5)
    }
  }

  isValid() {
    const target = Array(DIFFICULTY + 1).join("0")
    return this.hash.substring(0, DIFFICULTY) === target
  }

  setNonce(nonce) {
    this.nonce = nonce
    this.hash = sha256(this.height + this.prevHash + this.data + nonce).toString()
  }
}

export default Block
