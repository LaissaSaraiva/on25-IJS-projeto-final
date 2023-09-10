class ContaBancaria {
  nomeBanco;
  #saldoConta;

  static contasBancarias = [];

  constructor(nomeBanco, saldoConta) {
    this.verificaValorValido(saldoConta);
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
    const verificaSaldoSuficiente = this.verificaSaldoSuficiente(valor);
    if (verificaSaldoSuficiente) {
      this.#saldoConta -= valor;
      return this.mostraSaldoAtualizado();
    } else {
      return `Operação Negada. Saldo indisponível!`      
    }
  }

  adicionaValor(valor) {
    this.#saldoConta += valor;
    return this.mostraSaldoAtualizado();
  }

  verificaValorValido(valor) {
    if (typeof valor !== "number" || valor < 0) {
      throw new Error("Insira um valor válido");
    } else {
      return true;
    }
  }

  mostraSaldoAtualizado() {
    return `Saldo atualizado: R$${this.#saldoConta}.`;
  }

  verificaSaldoSuficiente(valor) {
    this.verificaValorValido(valor);
    const SALDO_MINIMO_PERMITIDO = 0;
    const saldoRestante = this.#saldoConta - valor;

    if (valor <= this.#saldoConta && saldoRestante >= SALDO_MINIMO_PERMITIDO) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = { ContaBancaria };
