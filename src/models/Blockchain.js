
import UTXOPool from './UTXOPool.js';

// 定义 Blockchain 类并导出
export default class Blockchain {
  // 构造函数
  constructor(name) {
    // 使用提供的 name 参数初始化 name 属性
    this.name = name;
    // 初始时将 genesis 设置为 null，表示尚未设置创世区块
    this.genesis = null;
    // 使用空对象初始化 blocks 属性，用于存储区块的映射
    this.blocks = {};
    // 创建一个 UTXOPool 实例作为 utxoPool 属性啊
    this.utxoPool = new UTXOPool();
  }

  // 返回当前链中最长的区块信息列表
  longestChain() {
    // 定义一个数组用于存储最长链上的区块信息
    let chain = [];
    // 获取当前链中高度最高的区块
    let maxHeightBlock = this.maxHeightBlock();

    // 从最高区块开始，沿着 prevHash 指针向前遍历区块链
    while (maxHeightBlock) {
      // 将当前区块添加到链的开头
      chain.unshift(maxHeightBlock);
      // 获取上一个区块的哈希，继续向前遍历
      maxHeightBlock = this.blocks[maxHeightBlock.prevHash];
    }

    // 返回最长链上的区块信息列表
    return chain;
  }

  // 检查当前区块链中是否包含指定的区块
  containsBlock(block) {
    // 使用区块的哈希作为键来检查 blocks 对象中是否存在该区块
    return !!this.blocks[block.hash];
  }

  // 获取当前区块链中高度最高的区块
  maxHeightBlock() {
    let maxHeight = -1;
    let maxHeightBlock = null;

    // 遍历 blocks 对象中的每个区块
    for (const hash in this.blocks) {
      let block = this.blocks[hash];
      // 如果当前区块的高度大于 maxHeight，则更新 maxHeight 和 maxHeightBlock
      if (block.height > maxHeight) {
        maxHeight = block.height;
        maxHeightBlock = block;
      }
    }

    // 返回高度最高的区块
    return maxHeightBlock;
  }

  // 添加区块到区块链
  _addBlock(block) {
    // 检查区块的有效性
    if (!block.isValid()) return;
    // 检查区块是否已存在于区块链中
    if (this.containsBlock(block)) return;

    // 如果区块中定义了矿工，则向 utxoPool 添加与矿工相关的 UTXO
    if (block.miner) {
      this.utxoPool.addUTXO(block.miner, 12.5);
    }

    // 将区块添加到 blocks 对象中，使用区块的哈希作为键
    this.blocks[block.hash] = block;
  }
}
