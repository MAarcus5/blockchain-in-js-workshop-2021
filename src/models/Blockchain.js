import UTXOPool from './UTXOPool.js'

export default class Blockchain {
  constructor(name) {
    this.name = name;
    this.blocks = [];
    this.genesis = null;
  }

  longestChain() {
    return this.blocks;
  }

  containsBlock(block) {
    return this.blocks.some(b => b.hash === block.hash);
  }

  _addBlock(block) {
    this.blocks.push(block);
  }
}