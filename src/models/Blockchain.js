import UTXOPool from './UTXOPool.js'

class Blockchain {
  constructor(name) {
    this.name = name
    this.genesis = null
    this.blocks = {}
    this.utxoPool = new UTXOPool()
  }

  longestChain() {
    let maxHeightBlock = this.maxHeightBlock()
    let chain = []
    while (maxHeightBlock) {
      chain.unshift(maxHeightBlock)
      maxHeightBlock = this.blocks[maxHeightBlock.prevHash]
    }
    return chain
  }

  containsBlock(block) {
    return !!this.blocks[block.hash]
  }

  maxHeightBlock() {
    let maxHeight = -1
    let maxHeightBlock = null
    for (const hash in this.blocks) {
      let block = this.blocks[hash]
      if (block.height > maxHeight) {
        maxHeight = block.height
        maxHeightBlock = block
      }
    }
    return maxHeightBlock
  }

  _addBlock(block) {
    if (!block.isValid()) return
    if (this.containsBlock(block)) return

    if (block.miner) {
      this.utxoPool.addUTXO(block.miner, 12.5)
    }
    this.blocks[block.hash] = block
  }
}

export default Blockchain