import sha256 from 'crypto-js/sha256.js';

class Transaction {
  constructor(from, to, value) {
    this.from = from;
    this.to = to;
    this.value = value;
    this.hash = sha256(this.from, this.to, this.value).toString();
  }

  // 更新交易哈希值
  /**
   * 更新交易的哈希值
   */
  updateHash() {
    this.hash = this._calculateHash();
  }

  // 计算交易哈希的摘要函数
  /**
   * 计算交易哈希的摘要函数
   * 返回值：
   * - 交易哈希的摘要字符串
   */
  _calculateHash() {
    return sha256(this.from, this.to, this.value).toString();
  }
}

export default Transaction;
