class ContaBancaria {
  nomeBanco;
  #saldoConta;

  static contasBancarias = [];

  constructor(nomeBanco, saldoConta) {
    this.verificaValor(saldoConta);
    this.nomeBanco = nomeBanco;
    this.#saldoConta = saldoConta;
    this.constructor.contasBancarias.push(this);
  }

  get saldoConta() {
    return this.#saldoConta;
  }

  set saldoConta(novoSaldo) {
    this.#saldoConta = novoSaldo;
  }

  debitaValor(valor) {
    this.#saldoConta -= valor;
    return `Saldo atualizado R$${this.#saldoConta}.`;
  }

  adicionaValor(valor) {
    this.#saldoConta += valor;
    return `Saldo atualizado R$${this.#saldoConta}.`;
  }

  verificaValor(valor) {
    if (typeof valor !== "number" || valor < 0) {
      throw new Error("Insira um valor válido");
    } else {
      return true;
    }
  }
}

const conta1 = new ContaBancaria("Nubank", 0);
// const conta2 = new ContaBancaria("Inter", 2500);

console.log(conta1);
console.log(conta1.saldoConta);

console.log(conta1.debitaValor(500));
console.log(conta1.saldoConta);
console.log(conta1.adicionaValor(5000));
console.log(conta1.saldoConta);
conta1.verificaValor(0);
console.log(conta1.verificaValor(0));

// console.log(ContaBancaria.contasBancarias)

module.exports = { ContaBancaria };
