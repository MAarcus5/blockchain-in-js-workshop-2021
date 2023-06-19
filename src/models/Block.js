import sha256 from 'crypto-js/sha256.js';

export const DIFFICULTY = 4; // 设置区块难度

export default class Block {
  constructor(blockchain, prevBlockHash, height, transactionsHash, coinbaseBeneficiary) {
    this.blockchain = blockchain;
    this.prevBlockHash = prevBlockHash;
    this.height = height;
    this.transactionsHash = transactionsHash;
    this.nonce = 0;
    this.timestamp = new Date().getTime();
    this.hash = this.calculateHash();
    this.coinbaseBeneficiary = coinbaseBeneficiary;
    this.transactions = [];
    this.utxoPool = null;
  }

  calculateHash() {
    return sha256(this.prevBlockHash + this.height + this.transactionsHash + this.nonce + this.timestamp).toString();
  }

  isValid() {
    return this.hash.substring(0, DIFFICULTY) === '0'.repeat(DIFFICULTY);
  }

  setNonce(nonce) {
    this.nonce = nonce;
    this.hash = this.calculateHash();
  }

  combinedTransactionsHash() {
    return sha256(this.transactions.map(trx => trx.hash).join('')).toString();
  }

  addTransaction(transaction) {
    if (!this.utxoPool.isValidTransaction(transaction)) {
      return;
    }

    this.transactions.push(transaction);
    this.utxoPool.processTransaction(transaction);
    this.transactionsHash = this.combinedTransactionsHash();
  }
}
