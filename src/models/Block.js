import sha256 from 'crypto-js/sha256.js';
import Transaction from './Transaction.js';

export const DIFFICULTY = 3;

class Block {
/**

表示区块链中的一个区块。
@param {Blockchain} blockchain - 区块所属的区块链。
@param {string} previousHash - 链中前一个区块的哈希值。
@param {number} height - 区块在区块链中的高度。
@param {string} data - 区块相关的数据。
@param {string} coinbaseBeneficiary - Coinbase 交易的受益人。
*/
constructor(blockchain, previousHash, height, data, coinbaseBeneficiary) {
this.blockchain = blockchain;
this.previousHash = previousHash;
this.height = height;
this.data = data;
this.coinbaseBeneficiary = coinbaseBeneficiary;
this.timestamp = new Date().getTime();
this.nonce = 0;
this.hash = this.calculateHash();
this.utxoPool = {};
}
/**

检查当前区块的哈希值是否符合难度要求。
@returns {boolean} - 如果哈希值前缀中的零的数量等于难度要求，则返回 true，否则返回 false。
*/
isValid() {
const hash = this.calculateHash();
return hash.substring(0, DIFFICULTY) === '0'.repeat(DIFFICULTY);
}
/**

计算当前区块的哈希值。
@returns {string} - 计算得到的哈希值。
*/
calculateHash() {
return sha256(
this.previousHash + this.height + this.data + this.timestamp + this.nonce
).toString();
}
/**

设置区块的随机数，并更新区块的哈希值。
@param {number} nonce - 要设置的随机数值。
*/
setNonce(nonce) {
this.nonce = nonce;
this.hash = this.calculateHash();
}
// TODO: 实现 _setHash() 方法，根据交易的变化更新区块的哈希值。

/**

计算所有交易的组合哈希值。
@returns {string} - 计算得到的组合哈希值。
*/
combinedTransactionsHash() {
// 获取所有交易数据
const transactions = this.data.split(';');
const hashes = [];
// 计算每笔交易的哈希值并保存
for (let i = 0; i < transactions.length; i++) {
  const [from, to, value] = transactions[i].split(',');
  const trx = new Transaction(from, to, value);
  hashes.push(trx.hash);
}

// 如果交易数量为奇数，则将最后一个哈希值重复一次
if (hashes.length % 2 === 1) {
  hashes.push(hashes[hashes.length - 1]);
}

// 循环合并哈希值，直到只剩下一个根哈希值
while (hashes.length > 1) {
  const combinedHashes = [];
  for (let i = 0; i < hashes.length; i += 2) {
    const leftHash = hashes[i];
    const rightHash = hashes[i + 1] || leftHash;
    const combined = sha256(leftHash + rightHash).toString();
    combinedHashes.push(combined);
  }
  hashes.length = 0;
  hashes.push(...combinedHashes);
}

return hashes[0];
}

/**

将交易添加到区块中。
@param {Transaction} tx - 要添加的交易。
*/
addTransaction(tx) {
// 如果交易无效，则直接结束
// if (!this.utxoPool.isValidTransaction(tx.from, tx.value)) {
// return
// }
// 更新 UTXO 池中的数据
this.utxoPool.handleTransaction(tx);

// 更新区块数据并重新计算哈希值
this.data += `;${tx.from},${tx.to},${tx.value}`;
this.hash = this.calculateHash();
}
}

export default Block;
