const crypto = require('crypto');
/**
 * 总体思路是根据数据构建默克尔树，通过递归验证每个节点的哈希值，从而确保数据的完整性。该实现简洁地展示了默克尔树的构建和验证过程，并可根据实际需求进行扩展和使用

1. 定义了默克尔树节点类（`MerkleNode`），包含节点数据、哈希值以及左右子节点。

2. 构建默克尔树的函数（`buildMerkleTree`）接受数据数组作为输入，将数据转换为叶子节点，并逐层进行哈希运算，构建默克尔树，最终返回根节点。

3. 哈希计算函数（`calculateHash`）使用 SHA-256 算法对给定的数据进行哈希运算，并返回哈希值。

4. 验证默克尔树的函数（`verifyMerkleTree`）通过递归方式验证每个节点的哈希值是否正确，从根节点开始逐层向下验证。

5. 示例用法中，给定一个交易数组，调用`buildMerkleTree`函数构建默克尔树，并使用`verifyMerkleTree`函数验证树的正确性。最后，输出默克尔根的哈希值和验证结果。


 */

// 定义默克尔树节点类
class MerkleNode {
  constructor(data) {
    this.data = data; // 节点存储的数据
    this.hash = null; // 节点的哈希值
    this.left = null; // 左子节点
    this.right = null; // 右子节点
  }
}

// 构建默克尔树
function buildMerkleTree(data) {
  if (data.length === 0) return null;

  // 创建叶子节点数组
  let nodes = data.map(item => {
    const node = new MerkleNode(item);
    node.hash = calculateHash(item);
    return node;
  });

  while (nodes.length > 1) {
    let newLevel = [];
    for (let i = 0; i < nodes.length; i += 2) {
      const left = nodes[i];
      const right = i + 1 < nodes.length ? nodes[i + 1] : left; // 处理奇数个节点的情况

      const parent = new MerkleNode(left.hash + right.hash);
      parent.left = left;
      parent.right = right;
      parent.hash = calculateHash(parent.hash);
      newLevel.push(parent);
    }
    nodes = newLevel;
  }

  return nodes[0]; // 返回根节点
}

// 计算哈希值
function calculateHash(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

// 验证默克尔树
function verifyMerkleTree(root, data) {
  if (!root) return false;

  // 递归验证树中的每个节点
  function verifyNode(node) {
    if (!node.left && !node.right) {
      // 叶子节点
      return node.hash === calculateHash(node.data);
    } else {
      // 内部节点
      const leftHash = node.left ? node.left.hash : '';
      const rightHash = node.right ? node.right.hash : '';
      const combinedHash = calculateHash(leftHash + rightHash);
      return node.hash === combinedHash && verifyNode(node.left) && verifyNode(node.right);
    }
  }

  // 验证根节点
  return verifyNode(root) && root.hash === calculateHash(data);
}

// 示例用法
const transactions = ['tx1', 'tx2', 'tx3', 'tx4'];
const root = buildMerkleTree(transactions);
const isVerified = verifyMerkleTree(root, transactions);

console.log('Merkle Root:', root ? root.hash : 'N/A');
console.log('Verification Result:', isVerified);

