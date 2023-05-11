
class Blockchain {
  // 1. 完成构造函数及其参数
  /* 构造函数需要包含 - 名字 - 创世区块 - 存储区块的映射 */
  constructor(name) {
    this.name = name;
    this.genesis = null;
    this.blocks = {};
  }

  // 2. 定义 longestChain 函数
  /* 返回当前链中最长的区块信息列表 */
  longestChain() {


    let longestChain = [];//声明最长链
    
    var lastBlockHash;//用来接收blockChain中最后一个区块的hash
    for (var hash in this.blocks){
      lastBlockHash = hash;
    }

    // 遍历区块链，寻找最长链
    // for 循环结束之后，lastBlockHash 的值为最后一个区块的 hash
    var currentBlock = this.blocks[lastBlockHash];

    // 区块链从后往前遍历，直到遍历到创世区块为止
    while (true) {

      longestChain.push(currentBlock); // 先将当前区块push进数组

      // 把if 判断语句放这里的原因，如果到了第一块区块时，就结束循环了
      // 如果放在 currentBlock更新操作之后，将无法存储第一块区块
      if (currentBlock.previousHash === "root") {
        break;
      }

      currentBlock = this.blocks[currentBlock.previousHash]
    }
    
    longestChain = longestChain.reverse();
    return longestChain;
  }
}

export default Blockchain;