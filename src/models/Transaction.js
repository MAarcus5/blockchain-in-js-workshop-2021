import sha256 from 'crypto-js/sha256.js'
import { verifySignature } from '../crypto.js'
export default class Transaction {
  constructor(sender, receiver, amount, fee, signature = null) {
    this.sender = sender;
    this.receiver = receiver;
    this.amount = amount;
    this.fee = fee;
    this.signature = signature;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return sha256(this.sender + this.receiver + this.amount + this.fee).toString();
  }

  hasValidSignature() {
    if (!this.signature) {
      return false;
    }
    return verifySignature(this.hash, this.signature, this.sender);
  }
}