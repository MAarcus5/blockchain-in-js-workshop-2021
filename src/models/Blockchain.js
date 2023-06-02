import UTXOPool from './UTXOPool.js'

class Blockchain {
  constructor(name) {
    this.name = name
    this.blocks = {}
    this.utxoPool = new UTXOPool()
  }

  longestChain() {
    let maxHeight = 0
    let maxHeightBlock = null

    for (const hash in this.blocks) {
      const block = this.blocks[hash]
      if (block.index > maxHeight) {
        maxHeight = block.index
        maxHeightBlock = block
      }
    }

    const chain = []
    while (maxHeightBlock) {
      chain.unshift(maxHeightBlock)
      maxHeightBlock = this.blocks[maxHeightBlock.previousHash]
    }

    return chain
  }

  containsBlock(block) {
    return !!this.blocks[block.hash]
  }

  maxHeightBlock() {
    let maxHeight = 0
    let maxHeightBlock = null

    for (const hash in this.blocks) {
      const block = this.blocks[hash]
      if (block.index > maxHeight) {
        maxHeight = block.index
        maxHeightBlock = block
      }
    }

    return maxHeightBlock
  }

  _addBlock(block) {
    if (!block.isValid()) return
    if (this.containsBlock(block)) return

    this.blocks[block.hash] = block
    this.utxoPool = block.utxoPool
  }
}

export default Blockchain