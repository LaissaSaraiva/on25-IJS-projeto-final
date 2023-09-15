const { Transacoes } = require("../Classes/Transacoes");
const { Despesas } = require("../Classes/Despesas");
const { Receitas } = require("../Classes/Receitas");

describe("Testa as Classes Transacoes", () => {
  let despesa1, receita1;

  beforeAll(() => {
    despesa1 = new Despesas("Pão", 2.5);
    receita1 = new Receitas("Salário", 2500);
  });

  describe("Testa as instânciações de Despesas e Receitas", () => {
    it("deve retornar uma instância de despesa", () => {
      const despesa2 = new Despesas("Cinema", 20);
      expect(despesa2).toEqual({
        descricao: "Cinema",
        tipo: "despesa",
        valor: 20,
      });
    });

    it("deve retornar uma instância de receita", () => {
      const receita2 = new Receitas("Site Freelancer", 3000);
      expect(receita2).toEqual({
        descricao: "Site Freelancer",
        tipo: "receita",
        valor: 3000,
      });
    });
  });

  describe("Testa os método estático listarTransacoes()", () => {
    it("deve retornar um array de Transacoes, com todas as instâncias de Receitas e Despesas", () => {
      const todasAsTransacoes = Transacoes.listarTransacoes();
      expect(todasAsTransacoes).toEqual([
        { descricao: "Pão", tipo: "despesa", valor: 2.5 },
        { descricao: "Salário", tipo: "receita", valor: 2500 },
        { descricao: "Cinema", tipo: "despesa", valor: 20 },
        { descricao: "Site Freelancer", tipo: "receita", valor: 3000 },
      ]);
    });
  });
});
