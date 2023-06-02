import sha256 from 'crypto-js/sha256.js'

// 创建Transaction类
class Transaction {
  // 构造函数，接受发送者、接收者和金额作为参数
  constructor(sender, receiver, amount) {
    // 设置对象的发送者属性
    this.sender = sender
    // 设置对象的接收者属性
    this.receiver = receiver
    // 设置对象的金额属性
    this.amount = amount
    // 设置对象的时间戳属性为当前时间
    this.timestamp = new Date().getTime()
    // 计算并设置对象的哈希属性
    this.hash = this._calculateHash()
  }

  // 设置对象的哈希值
  _setHash() {
    this.hash = this._calculateHash()
  }

  // 计算对象的哈希值
  _calculateHash() {
    // 使用sha256哈希算法计算发送者、接收者、金额和时间戳的哈希值
    return sha256(
      this.sender + this.receiver + this.amount + this.timestamp
    ).toString()
  }
}

// 导出Transaction类，使其可以在其他模块中使用
export default Transaction
