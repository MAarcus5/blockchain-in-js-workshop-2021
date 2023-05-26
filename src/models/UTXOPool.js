import UTXO from './UTXO.js'

class UTXOPool {
  constructor(utxos = {}) {
    this.utxos = utxos
  }

  addUTXO(owner, amount) {
    if (this.utxos[owner]) {
      this.utxos[owner].amount += amount
    } else {
      this.utxos[owner] = new UTXO(owner, amount)
    }
  }

  clone() {
    return new UTXOPool({ ...this.utxos })
  }
}

export default UTXOPool
