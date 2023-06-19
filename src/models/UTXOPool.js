import UTXO from './UTXO.js'

export default class UTXOPool {
  constructor() {
    this.utxos = {};
  }

  addUTXO(address, amount) {
    this.utxos[address] = new UTXO(address, amount);
  }

  clone() {
    const newPool = new UTXOPool();
    newPool.utxos = { ...this.utxos };
    return newPool;
  }

  processTransaction(transaction) {
    const senderUTXO = this.utxos[transaction.sender];
    const receiverUTXO = this.utxos[transaction.receiver];

    senderUTXO.amount -= transaction.amount + transaction.fee;

    if (!receiverUTXO) {
      this.addUTXO(transaction.receiver, transaction.amount);
    } else {
      receiverUTXO.amount += transaction.amount;
    }
  }

  isValidTransaction(transaction) {
    const senderUTXO = this.utxos[transaction.sender];

    if (!senderUTXO) {
      return false;
    }

    if (senderUTXO.amount < transaction.amount + transaction.fee) {
      return false;
    }

    return true;
  }
}
