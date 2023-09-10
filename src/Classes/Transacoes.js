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

  static filtrarTransacaoPorTipo(tipo) {
    const arrayPorTipo = this.transacoes.filter((transacao) => {
      if (transacao.tipo) {
        return transacao.tipo === tipo;
      } else {
        return false;
      }
    });

    return arrayPorTipo;
  }
}

module.exports = { Transacoes };
