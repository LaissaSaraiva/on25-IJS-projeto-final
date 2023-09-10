const { Transacoes } = require("./Transacoes");

class Despesas extends Transacoes {
  tipo = "despesa";

  static despesas = [];

  constructor(descricao, valor) {
    super(descricao, valor);
    this.constructor.despesas.push({
      descricao: this.descricao,
      valor: this.valor,
      tipo: this.tipo,
    });
  }
}

module.exports = { Despesas };
