import UTXO from './UTXO.js';

class UTXOPool {
  constructor(utxos = {}) {
    this.utxos = utxos;
  }

  addUTXO(coinbaseBeneficiary, input, output) {
    var utxo = new UTXO(0);

    // 从UTXO池中获取与coinbaseBeneficiary（接收方地址）相关联的UTXO对象。
    var minerUTXO = this.utxos[coinbaseBeneficiary];

    // 检查是否存在与coinbaseBeneficiary相关联的UTXO对象。
    if (minerUTXO != null) {
      // 更新账户余额
      utxo.amount += minerUTXO.amount;
    }

    // 账户的出块奖励
    utxo.amount += 12.5;

    // 余额为出块奖励+输入-输出
    utxo.amount = utxo.amount + input - output;

    // 将新创建的或已更新的UTXO对象与coinbaseBeneficiary相关联，并将其添加到UTXO池中。
    this.utxos[coinbaseBeneficiary] = utxo;
  }

  clone() {
    const clonedUtxos = {};
    for (const address in this.utxos) {
      clonedUtxos[address] = this.utxos[address].clone();
    }
    return new UTXOPool(clonedUtxos);
  }

  // 处理交易函数
  /**
   * 处理交易函数
   * 更新UTXO池中的余额
   */
  handleTransaction(tx) {
    if (this.isValidTransaction(tx.from, tx.value)) {
      this.utxos[tx.from].amount -= tx.value;
      if (this.utxos[tx.to]) {
        this.utxos[tx.to] += tx.value;
      } else {
        this.utxos[tx.to] = new UTXO(tx.value);
      }
    } else {
      return;
    }
  }

  // 验证交易合法性
  /**
   * 验证交易的合法性
   * 参数：
   * - address: 交易发起方地址
   * - value: 交易金额
   * 返回值：
   * - bool：交易是否合法
   */
  isValidTransaction(address, value) {
    return this.utxos[address] && this.utxos[address].amount >= value;
  }
}

export default UTXOPool;
