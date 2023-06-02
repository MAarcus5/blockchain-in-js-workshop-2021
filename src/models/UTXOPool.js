import UTXO from './UTXO.js'

// 创建UTXOPool类
class UTXOPool {
  // 构造函数，接受一个包含UTXO的对象作为参数，默认为空对象
  constructor(utxos = {}) {
    this.utxos = utxos
  }

  // 添加UTXO到UTXOPool中
  addUTXO(publicKey, amount) {
    // 创建一个新的UTXO对象
    const utxo = new UTXO(publicKey, amount)
    // 检查UTXOPool中是否已存在给定公钥的UTXO
    if (this.utxos[publicKey]) {
      // 如果已存在，则增加该UTXO的金额
      this.utxos[publicKey].amount += amount
    } else {
      // 如果不存在，则将新的UTXO对象添加到UTXOPool中
      this.utxos[publicKey] = utxo
    }
  }

  // 克隆UTXOPool，返回一个具有相同UTXOs的新的UTXOPool实例
  clone() {
    return new UTXOPool({ ...this.utxos })
  }

  // 处理交易，更新UTXOPool中的UTXOs
  handleTransaction(transaction) {
    // 检查交易是否有效
    if (!this.isValidTransaction(transaction.sender, transaction.amount)) {
      return
    }

    // 减少发送者的UTXO金额
    this.utxos[transaction.sender].amount -= transaction.amount
    // 添加接收者的UTXO
    this.addUTXO(transaction.receiver, transaction.amount)
  }

  // 验证交易是否有效
  isValidTransaction(publicKey, amount) {
    // 获取给定公钥的UTXO
    const utxo = this.utxos[publicKey]
    // 如果不存在对应的UTXO，则交易无效
    if (!utxo) return false
    // 检查UTXO的金额是否大于等于交易金额
    return utxo.amount >= amount
  }
}

// 导出UTXOPool类，使其可以在其他模块中使用
export default UTXOPool
