const { Transacoes } = require("./Transacoes");

class Despesas extends Transacoes {
  tipo = "despesa";

  constructor(descricao, valor) {
    super(descricao, valor);
  }
}

module.exports = { Despesas };
