const { Transacoes } = require("./Transacoes");

class Receitas extends Transacoes {
  tipo = "receita";

  constructor(descricao, valor) {
    super(descricao, valor);
  }
}

module.exports = { Receitas };
