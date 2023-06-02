import UTXOPool from './UTXOPool.js'

// 创建Blockchain类
class Blockchain {
  // 构造函数，接受一个名称作为参数
  constructor(name) {
    // 设置对象的名称属性
    this.name = name
    // 创建一个空对象用于存储区块
    this.blocks = {}
    // 创建一个UTXOPool实例用于管理未花费的交易输出
    this.utxoPool = new UTXOPool()
  }

  // 获取最长的区块链
  longestChain() {
    let maxHeight = 0
    let maxHeightBlock = null

    // 遍历所有的区块
    for (const hash in this.blocks) {
      const block = this.blocks[hash]
      // 检查区块的索引是否更大，更新最大高度和对应的区块
      if (block.index > maxHeight) {
        maxHeight = block.index
        maxHeightBlock = block
      }
    }

    const chain = []
    // 从最大高度的区块开始，逐步向前构建区块链
    while (maxHeightBlock) {
      chain.unshift(maxHeightBlock)
      maxHeightBlock = this.blocks[maxHeightBlock.previousHash]
    }

    return chain
  }

  // 检查区块是否存在于区块链中
  containsBlock(block) {
    return !!this.blocks[block.hash]
  }

  // 获取最大高度的区块
  maxHeightBlock() {
    let maxHeight = 0
    let maxHeightBlock = null

    // 遍历所有的区块
    for (const hash in this.blocks) {
      const block = this.blocks[hash]
      // 检查区块的索引是否更大，更新最大高度和对应的区块
      if (block.index > maxHeight) {
        maxHeight = block.index
        maxHeightBlock = block
      }
    }

    return maxHeightBlock
  }

  // 添加区块到区块链中
  _addBlock(block) {
    // 检查区块的有效性
    if (!block.isValid()) return
    // 检查区块是否已经存在于区块链中
    if (this.containsBlock(block)) return

    // 将区块添加到区块链中
    this.blocks[block.hash] = block
    // 更新UTXOPool为区块的UTXOPool
    this.utxoPool = block.utxoPool
  }
}

// 导出Blockchain类，使其可以在其他模块中使用
export default Blockchain
