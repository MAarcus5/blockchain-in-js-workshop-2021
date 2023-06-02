export default class UTXO {
  // 构造函数，接受公钥和金额作为参数
  constructor(publicKey, amount) {
    // 设置对象的公钥属性
    this.publicKey = publicKey
    // 设置对象的金额属性
    this.amount = amount
  }
}
