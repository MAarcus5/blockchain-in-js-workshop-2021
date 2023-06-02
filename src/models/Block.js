import sha256 from 'crypto-js/sha256.js'

// 定义难度常量，表示区块的哈希值需要满足的前导零的数量
export const DIFFICULTY = 2
/*
总体思路：

1. 导入sha256哈希算法模块，用于计算区块的哈希值。
2. 定义了一个常量DIFFICULTY，表示区块的难度。
3. Block类的构造函数接受区块链对象、前一个区块的哈希值、区块索引、数据、coinbase收款地址作为参数，用于初始化区块的各个属性。
在构造函数中，还会初始化区块的哈希值、UTXOPool和coinbase的未花费输出。
4. calculateHash()方法用于计算区块的哈希值。它基于区块的前一个哈希值、时间戳、数据和nonce值进行哈希计算。
5. isValid()方法用于验证区块的有效性。它检查区块的哈希值是否满足指定的难度要求，即哈希值前面是否有一定数量的0。
6. setNonce(nonce)方法用于设置区块的nonce值，并重新计算区块的哈希值。
*/


// 创建Block类
class Block {
  // 构造函数，接受区块链、上一个区块的哈希值、索引、数据和coinbase收款地址作为参数
  constructor(blockchain, previousHash, index, data, coinbaseBeneficiary) {
    // 设置对象的区块链属性
    this.blockchain = blockchain
    // 设置对象的上一个区块哈希属性
    this.previousHash = previousHash
    // 设置对象的时间戳属性为当前时间
    this.timestamp = new Date().getTime()
    // 设置对象的索引属性
    this.index = index
    // 设置对象的数据属性
    this.data = data
    // 设置对象的nonce属性为初始值0
    this.nonce = 0
    // 设置对象的难度属性为预设的难度常量
    this.difficulty = DIFFICULTY
    // 设置对象的coinbase收款地址属性
    this.coinbaseBeneficiary = coinbaseBeneficiary
    // 计算并设置对象的哈希属性
    this.hash = this.calculateHash()
    // 创建一个UTXOPool副本，并将coinbase奖励添加到UTXOPool中
    this.utxoPool = blockchain.utxoPool.clone()
    this.utxoPool.addUTXO(coinbaseBeneficiary, 12.5)
  }

  // 计算区块的哈希值
  calculateHash() {
    // 使用sha256哈希算法计算前一个区块哈希、时间戳、数据和nonce的哈希值
    return sha256(
      this.previousHash +
        this.timestamp +
        JSON.stringify(this.data) +
        this.nonce
    ).toString()
  }

  // 验证区块的有效性
  isValid() {
    // 检查区块的哈希值是否满足难度要求（前导零的数量）
    return this.hash.substring(0, this.difficulty) === '0'.repeat(this.difficulty)
  }

  // 设置区块的nonce值，并重新计算区块的哈希值
  setNonce(nonce) {
    this.nonce = nonce
    this.hash = this.calculateHash()
  }
}

// 导出Block类，使其可以在其他模块中使用
export default Block

