import UTXO from './UTXO.js';

class UTXOPool {
  constructor(utxos = {}) {
    this.utxos = utxos
  }

  addUTXO(publicKey, amount) {
    if (this.utxos[publicKey]) {
      this.utxos[publicKey].amount += amount
    } else {
      this.utxos[publicKey] = new UTXO(publicKey, amount)
    }
  }

  clone() {
    const clonedUTXOPool = new UTXOPool()
    clonedUTXOPool.utxos = { ...this.utxos }
    return clonedUTXOPool
  }

  handleTransaction(transaction) {
    const senderUTXO = this.utxos[transaction.senderPublicKey]
    const receiverUTXO = this.utxos[transaction.receiverPublicKey]

if (!senderUTXO || senderUTXO.amount < transaction.amount + transaction.fee) {
  return false
}

senderUTXO.amount -= transaction.amount + transaction.fee

if (receiverUTXO) {
  receiverUTXO.amount += transaction.amount
} else {
  this.utxos[transaction.receiverPublicKey] = new UTXO(
    transaction.receiverPublicKey,
    transaction.amount
  )
}

return true
  }

  isValidTransaction(transaction) {
    const senderUTXO = this.utxos[transaction.senderPublicKey]
    if (!senderUTXO) return false
    if (senderUTXO.amount < transaction.amount + transaction.fee) return false

return true
  }
}

export default UTXOPool