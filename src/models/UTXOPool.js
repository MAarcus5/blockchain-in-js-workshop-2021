import UTXO from './UTXO.js'

class UTXOPool {
  constructor(utxos = {}) {
    this.utxos = utxos
  }

  addUTXO(publicKey, amount) {
    const utxo = new UTXO(publicKey, amount)
    if (this.utxos[publicKey]) {
      this.utxos[publicKey].amount += amount
    } else {
      this.utxos[publicKey] = utxo
    }
  }

  clone() {
    return new UTXOPool({ ...this.utxos })
  }

  handleTransaction(transaction) {
    if (!this.isValidTransaction(transaction.sender, transaction.amount)) {
      return
    }

    this.utxos[transaction.sender].amount -= transaction.amount
    this.addUTXO(transaction.receiver, transaction.amount)
  }

 isValidTransaction(publicKey, amount) {
    const utxo = this.utxos[publicKey]
    if (!utxo) return false
    return utxo.amount >= amount
  }
}

export default UTXOPool
