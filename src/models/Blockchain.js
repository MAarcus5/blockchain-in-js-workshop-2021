import UTXOPool from './UTXOPool.js'

class Blockchain {
  constructor(name) {
    this.name = name
    this.blocks = {}
    this.currentUTXOPool = new UTXOPool()
  }

  longestChain() {
    const maxHeightBlock = this.maxHeightBlock()
    const chain = []
    let currentBlock = maxHeightBlock

    while (currentBlock) {
      chain.unshift(currentBlock)
      currentBlock = this.blocks[currentBlock.previousHash]
    }

    return chain
  }

  containsBlock(block) {
    for (const key in this.blocks) {
      if (this.blocks[key].hash === block.hash) {
        return true
      }
    }
    return false
  }

  maxHeightBlock() {
    let maxHeight = -1
    let maxHeightBlock = null

    for (const key in this.blocks) {
      const block = this.blocks[key]
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
    if (block.index > (this.currentUTXOPool.blockIndex || -1)) {
      this.currentUTXOPool = block.utxoPool
      this.currentUTXOPool.blockIndex = block.index
    }
  }
}

export default Blockchain
