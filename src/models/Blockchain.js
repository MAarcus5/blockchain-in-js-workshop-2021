import UTXOPool from './UTXOPool.js';

class Blockchain {
  // 1. 完成构造函数及其参数
  /**
   * 构造函数需要包含以下参数：
   * - 名字：区块链的名称
   * - 创世区块：初始区块
   * - 存储区块的映射：用于存储区块的哈希映射表
   */
  constructor(name) {
    this.name = name;
    this.blocks = {};
    this.genesis = null;
    this.utxoPool = new UTXOPool();
  }

  longestChain() {
    const longestChain = [];
    let block = this.maxHeightBlock();
    while (block) {
      longestChain.push(block);
      block = this.blocks[block.previousHash];
    }
    return longestChain.reverse();
  }

  // 判断当前区块链是否包含指定区块
  containsBlock(block) {
    /**
     * 判断当前区块链是否包含指定区块
     * 返回值：
     * - true：如果包含指定区块
     * - false：如果不包含指定区块
     */
    return block.hash in this.blocks;
  }

  // 获取区块高度最高的区块
  maxHeightBlock() {
    let maxHeight = -1;
    let maxHeightBlock = null;
    for (const hash in this.blocks) {
      if (this.blocks[hash].height > maxHeight) {
        maxHeight = this.blocks[hash].height;
        maxHeightBlock = this.blocks[hash];
      }
    }
    return maxHeightBlock;
  }

  // 添加区块
  /**
   * 添加区块到区块链
   * 参数：
   * - block：要添加的区块
   *
   * 注意事项：
   * - 如果区块无效或已存在于区块链中，则不执行添加操作
   * - 添加区块时需要进行 UTXO 快照和更新的相关逻辑
   */
  _addBlock(block) {
    if (!block.isValid()) return;
    if (this.containsBlock(block)) return;

    // 进行 UTXO 快照和更新的相关逻辑
    const currentBlock = this.maxHeightBlock();
    let utxoPool = new UTXOPool();
    if (currentBlock == null) {
      utxoPool.addUTXO(block.coinbaseBeneficiary, 0, 0);
      block.utxoPool = utxoPool;
    } else {
      const currentUTXOPool = currentBlock.utxoPool;
      currentUTXOPool.addUTXO(block.coinbaseBeneficiary, 0, 0);
      block.utxoPool = currentUTXOPool;
    }

    this.blocks[block.hash] = block;
  }

  // 获取当前的 UTXO 池
  /**
   * 获取当前的 UTXO 池的副本
   * 返回值：
   * - 当前的 UTXO 池的副本
   */
  getUTXOPool() {
    return this.utxoPool.clone();
  }
}

export default Blockchain;
