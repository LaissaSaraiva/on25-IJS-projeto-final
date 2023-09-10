const { Transacoes } = require("./Transacoes");

class Receitas extends Transacoes {
  tipo = "receitas";

  static receitas = [];

  constructor(descricao, valor) {
    super(descricao, valor);
    this.constructor.receitas.push({
      descricao: this.descricao,
      valor: this.valor,
      tipo: this.tipo,
    });
  }
}

module.exports = { Receitas };
