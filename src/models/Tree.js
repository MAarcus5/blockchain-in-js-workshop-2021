/*
总体思路：
定义字典树节点类TrieNode，包含isEndOfWord属性表示是否为字符串的结束节点，以及children数组用于存储字符到子节点的映射关系。

定义字典树类Trie，包含根节点root。

在Trie类中，实现insert(word)方法用于向字典树中插入一个字符串。
遍历字符串的每个字符，根据字符获取对应的索引，检查当前节点的子节点中是否存在该索引。如果不存在，则创建一个新的节点并存储到相应的索引位置。
移动到下一个节点，重复该过程直到遍历完整个字符串。最后，标记最后一个节点为字符串的结束节点。

在Trie类中，实现search(word)方法用于搜索一个字符串是否在字典树中。
遍历字符串的每个字符，根据字符获取对应的索引，检查当前节点的子节点中是否存在该索引。
如果不存在，则字符串不存在于字典树中，返回false。移动到下一个节点，重复该过程直到遍历完整个字符串。
最后，检查最后一个节点是否为字符串的结束节点，返回相应的结果。

在Trie类中，实现startsWith(prefix)方法用于检查字典树中是否存在以给定前缀开头的字符串。
遍历前缀的每个字符，根据字符获取对应的索引，检查当前节点的子节点中是否存在该索引。
如果不存在，则前缀不存在于字典树中，返回false。移动到下一个节点，重复该过程直到遍历完整个前缀。如果能够顺利遍历完前缀，返回true。

创建一个Trie对象，并进行示例用法的测试。插入字符串"apple"和"banana"到字典树中，并进行搜索和前缀检查操作，打印结果。
 */
 


// 定义字典树节点类
class TrieNode {
    constructor() {
      // 标记当前节点是否为字符串的结束节点
      this.isEndOfWord = false;
  
      // 子节点数组，用于存储字符到子节点的映射关系
      this.children = new Array(26).fill(null);
    }
  }
  
  // 定义字典树类
  class Trie {
    constructor() {
      // 创建字典树的根节点
      this.root = new TrieNode();
    }
  
    // 向字典树中插入一个字符串
    insert(word) {
      let node = this.root;
      for (let i = 0; i < word.length; i++) {
        const char = word[i];
        const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
  
        // 如果当前字符的子节点不存在，则创建一个新的子节点
        if (!node.children[index]) {
          node.children[index] = new TrieNode();
        }
  
        // 移动到下一个节点
        node = node.children[index];
      }
  
      // 标记最后一个节点为字符串的结束节点
      node.isEndOfWord = true;
    }
  
    // 搜索一个字符串是否在字典树中
    search(word) {
      let node = this.root;
      for (let i = 0; i < word.length; i++) {
        const char = word[i];
        const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
  
        // 如果当前字符的子节点不存在，则字符串不存在于字典树中
        if (!node.children[index]) {
          return false;
        }
  
        // 移动到下一个节点
        node = node.children[index];
      }
  
      // 检查最后一个节点是否为字符串的结束节点
      return node.isEndOfWord;
    }
  
    // 检查字典树中是否存在以给定前缀开头的字符串
    startsWith(prefix) {
      let node = this.root;
      for (let i = 0; i < prefix.length; i++) {
        const char = prefix[i];
        const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
  
        // 如果当前字符的子节点不存在，则前缀不存在于字典树中
        if (!node.children[index]) {
          return false;
        }
  
        // 移动到下一个节点
        node = node.children[index];
      }
  
      return true;
    }
  }
  
  // 示例用法
  const trie = new Trie();
  trie.insert('apple');
  trie.insert('banana');
  console.log('Search "apple":', trie.search('apple')); // true
  console.log('Search "banana":', trie.search('banana')); // true
  console.log('Search "orange":', trie.search('orange')); // false
  console.log('StartsWith "app":', trie.startsWith('app')); // true
  console.log('StartsWith "ora":', trie.startsWith('ora')); // false
  