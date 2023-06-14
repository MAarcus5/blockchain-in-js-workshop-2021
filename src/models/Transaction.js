import sha256 from 'crypto-js/sha256.js';

class Transaction {
  constructor(senderPublicKey, receiverPublicKey, amount, fee) {
    this.senderPublicKey = senderPublicKey
    this.receiverPublicKey = receiverPublicKey
    this.amount = amount
    this.fee = fee
    this._setHash()
  }

  _setHash() {
    this.hash = this._calculateHash()
  }

  _calculateHash() {
    return sha256(
      this.senderPublicKey +
        this.receiverPublicKey +
        this.amount +
        this.fee
    ).toString()
  }
}

export default Transaction