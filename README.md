# 实验报告模板

## 小组成员

- 2021131100-蔡东 （组长）
- 2021131110-陈华科
- 2021131109-唐宏钦
- 2021131108-韦科材
- 2021131113-卢浩
- 2021131096-黎书义



## 代码仓库链接

https://github.com/MAarcus5/blockchain-in-js-workshop-2021



## 第一课代码


### 代码 commint 地址

https://github.com/MAarcus5/blockchain-in-js-workshop-2021/commit/ed53b21cb28914805610b9b273887fba83b6a2c4


### 代码截图

> 将截图上传至网盘，放入链接即可

![iqg4sJ.png](https://i.328888.xyz/2023/05/11/iqg4sJ.png)
![VVFPlz.png](https://i.328888.xyz/2023/05/18/VVFPlz.png)

### 主观与讨论题内容




## 第一课代码


### 代码 commint 地址

https://github.com/MAarcus5/blockchain-in-js-workshop-2021/commit/ed53b21cb28914805610b9b273887fba83b6a2c4



### 代码截图

> 将截图上传至网盘，放入链接即可

![iqg4sJ.png](https://i.328888.xyz/2023/05/11/iqg4sJ.png)
![VVFPlz.png](https://i.328888.xyz/2023/05/18/VVFPlz.png)


### 主观与讨论题内容
本次实验我们采用了很多外力的帮助，通过其他小组对于我们小组的帮助我们能够顺利完成这次实验，实验的内容对于才接触JS的我来说有很大的困难，但对于区块链的实现和代码的设计很感兴趣，这对于我们了解区块链有很大的帮助



## 第二课代码


### 代码 commint 地址

https://github.com/MAarcus5/blockchain-in-js-workshop-2021/commit/d632df5b7d8f9466ceeeeb532df1a3f90394087a


### 代码截图

> 将截图上传至网盘，放入链接即可

![VVFNbv.png](https://i.328888.xyz/2023/05/18/VVFNbv.png)
![VVFIVU.png](https://i.328888.xyz/2023/05/18/VVFIVU.png)
![VVFr63.png](https://i.328888.xyz/2023/05/18/VVFr63.png)


### 主观与讨论题内容
我们组进行了关于 Blockchain.js 和 Block.js 代码的讨论，对代码的设计和功能进行了解释和讨论，并分享了彼此的观点。讨论了 Blockchain.js 中的 Blockchain 类，该类用于管理区块链，其中包含了初始化区块链、查找最长链等功能。还特别关注了 longestChain() 方法的实现，该方法通过遍历区块链中的所有区块，找到最高高度的区块，并逐个向前查找前一个区块来构建最长的区块链。
我们还讨论了 Block.js 中的 Block 类，该类用于创建区块对象。讨论了区块的验证、设置 nonce 值和计算哈希值等功能，并注意到了全局变量 DIFFICULTY 对哈希难度的控制作用。
总的来说，我们对区块链的实现和代码设计感到兴奋，而且其他组愿意和互相分享和帮助，带动我们组完成实验。期待进一步探索和理解区块链的工作原理。





## 第三课代码


### 代码 commint 地址

https://github.com/MAarcus5/blockchain-in-js-workshop-2021/commit/f372facc4862195c72fa6368e848e7258beabfd1


### 代码截图

[![p9bfpW9.png](https://s1.ax1x.com/2023/05/26/p9bfpW9.png)](https://imgse.com/i/p9bfpW9)
[![p9bfSJJ.png](https://s1.ax1x.com/2023/05/26/p9bfSJJ.png)](https://imgse.com/i/p9bfSJJ)
[![p9bf9zR.png](https://s1.ax1x.com/2023/05/26/p9bf9zR.png)](https://imgse.com/i/p9bf9zR)
[![p9bfPQ1.png](https://s1.ax1x.com/2023/05/26/p9bfPQ1.png)](https://imgse.com/i/p9bfPQ1)


### 主观与讨论题内容
这次实验可以深入了解区块链的基本概念和原理，包括区块、区块链、UTXO 池等核心组成部分，以及它们之间的关系和功能。添加交易输出到 UTXO 池中、UTXO 的更新和克隆等操作，以及与区块链的关系和作用 我们组都遇到了很大的困难和挑战，但根据网上查阅和同学帮助让我们能够勉强完成这次实验。区块链的创建、区块的添加和验证、区块链的查询和展示，以及交易输出和UTXO池的管理，从而加深对区块链技术的理解。







## 第四课代码


### 代码 commint 地址

https://github.com/MAarcus5/blockchain-in-js-workshop-2021/commit/bfea86707fc589cb355e2862ea3820621fe33502


### 代码截图

> 将截图上传至网盘，放入链接即可

[![pCpSXkR.jpg](https://s1.ax1x.com/2023/06/02/pCpSXkR.jpg)](https://imgse.com/i/pCpSXkR)


### 主观与讨论题内容
本次实验实现了一个简化的区块链系统。关键组件包括UTXO（未花费的交易输出）、Transaction（交易）、UTXOPool（UTXO池）和Blockchain（区块链）。UTXO用于表示未花费的金额，Transaction用于表示交易，UTXOPool用于管理UTXO，Blockchain用于管理区块链。
代码中的Block类代表区块，包含前一个区块的哈希值、时间戳、索引、数据等属性。计算区块的哈希值采用了sha256算法，验证区块的有效性需要满足指定的难度要求。实现过程中遇到了很多的困难，但是在同学和其他组的帮助下能够完成这次试验的内容，代码中的注释能更好的方便我们组理解和实现。
整体思路是基于区块链的核心概念，通过链式链接每个区块，每个区块包含交易信息和UTXO池的状态。通过计算区块的哈希值和验证区块的有效性，确保区块链的安全性和一致性。这样的实现为构建更复杂的区块链系统打下了基础，可以进一步扩展和应用于加密货币等领域。





## 第五课代码


### 代码 commint 地址

https://github.com/MAarcus5/blockchain-in-js-workshop-2021/commit/2d9a461e2825aebd75a00adf29472735c2bcf270


### 代码截图

> 将截图上传至网盘，放入链接即可

[![pCFTMQg.png](https://s1.ax1x.com/2023/06/07/pCFTMQg.png)](https://imgse.com/i/pCFTMQg)


### 主观与讨论题内容
本次实验内容涵盖了区块链的关键组件，包括区块、交易和UTXO池。通过构造函数、验证方法和处理函数，这些组件共同协作，实现了区块链的基本功能。区块链通过使用哈希算法确保数据的完整性和安全性。每个区块都包含前一区块的哈希值，以确保数据的连续性。而交易则被组合成区块，并通过默克尔树进行摘要计算，以保护交易数据的完整性。
UTXO池起到管理账户余额的作用，它记录了未花费的交易输出，并在处理交易时更新余额。通过验证交易的合法性，确保账户拥有足够的余额进行交易。
整体的实现过程相对困难，但在别的小组的帮助下能够勉强完成，加深了我们对区块链的工作原理基础的理解






## 第六课代码


### 代码 commint 地址

https://github.com/CUITBlockchain/blockchain-in-js-workshop-2021/commit/6d132c554c5f57f1584b8593a81c591dda0f9e53


### 代码截图

> 将截图上传至网盘，放入链接即可

[![pCnq5a6.png](https://s1.ax1x.com/2023/06/14/pCnq5a6.png)](https://imgse.com/i/pCnq5a6)


### 主观与讨论题内容

本次实验内容，尝试了很多次的debug和更换代码仍然有报错情况，本次实验内容以失败告终

---


## 结课报告





