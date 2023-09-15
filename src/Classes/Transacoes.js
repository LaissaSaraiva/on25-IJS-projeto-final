class Transacoes {
  descricao = "";
  valor = 0;
  tipo = "";

  static transacoes = [];

  constructor(descricao, valor) {
    this.descricao = descricao;
    this.valor = valor;
    this.constructor.transacoes.push(this);
  }

  static listarTransacoes() {
    return this.transacoes;
  }
}

module.exports = { Transacoes };
