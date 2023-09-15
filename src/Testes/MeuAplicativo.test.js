const { Usuario } = require("../Classes/Usuario");
const { Transacoes } = require("../Classes/Transacoes");
const { Despesas } = require("../Classes/Despesas");
const { Receitas } = require("../Classes/Receitas");
const { ContaBancaria } = require("../Classes/ContaBancaria");
const { MeuAplicativo } = require("../Classes/MeuAplicativo");
const { MetasFinanceiras } = require("../Classes/MetasFinanceiras")

describe("Testa a Classe MeuAplicativo", () => {
  let usuario1, meuApp1;

  beforeAll(() => {
    usuario1 = new Usuario(
      "Jay",
      "Arquiteto",
      20000,
      "jay@email.com",
      "Manny&Gloria"
    );
    meuApp1 = new MeuAplicativo(usuario1);
    meuApp1.adicionaContaBancaria("Modern Bank", 20000);
  });

  it("deve retornar uma nova conta no Aplicativo já com os dados de usuários e indicação de um Planejamento Financeiro Mensal, se usuário for instância de Usuário", () => {
    expect(meuApp1).toEqual({
      contasBancarias: [{ nomeBanco: "Modern Bank" }],
      historicoTransacoes: {
        despesas: [],
        receitas: [],
        metas: [],
        totalDespesas: 0,
        totalReceitas: 0,
      },
      planejamentoMensal: { essenciais: 14000, metas: 6000 },
      usuario: { nome: "Jay", profissao: "Arquiteto" },
    });
  });

  it("deve adicionar despesa de R$5000 e retornar o saldo atual de R$ 15000", () => {
    meuApp1.adicionaDespesas("Presente Glória", 5000);
    let saldoAtualizado = meuApp1.mostraSaldoAtualizado();
    expect(saldoAtualizado).toBe("Jay, o seu saldo atualizado é: R$15000.");
  });

  it("deve adicionar uma receita de R$20000 e retornar o saldo atualizado de R$35000", () => {
    meuApp1.adicionaReceitas("Salario", 20000);
    let saldoAtualizado = meuApp1.mostraSaldoAtualizado();
    expect(saldoAtualizado).toBe("Jay, o seu saldo atualizado é: R$35000.");
  });

  it("deve adicionar uma meta Financeira e retornar uma sugestão de economia Mensal", () => {
    const meta1 = meuApp1.adicionaMetasFinanceiras(
      "Viagem com a Família",
      6,
      15000
    );
    expect(meta1).toBe(
      "Para alcançar 15000 em 6 meses, será recomendável economizar R$2500 mensalmente."
    );
  });

  it("deve adicionar uma despesa no valor de 10000, e retornar o total de despesas de R$15000", () => {
    const despesaFerias = meuApp1.adicionaDespesas("Férias em Família", 10000);

    expect(meuApp1.historicoTransacoes.totalDespesas).toEqual(15000);
  });

  it("deve retornar o alerta de gastos, caso tenha ultrapassado o valor recomendado de despesas", () => {
    expect(meuApp1.mostraAlertaGastos()).toEqual(
      "Alerta, você ultrapassou R$1000 no seu orçamento!"
    );
  });

  it("deve retornar o valor total de Receitas de R$45000", () => {
    meuApp1.adicionaReceitas("Bonus", 5000);
    meuApp1.adicionaReceitas("Venda do Carro", 50000);

    expect(meuApp1.historicoTransacoes.receitas).toEqual([
      { descricao: "Salario", tipo: "receita", valor: 20000 },
      { descricao: "Bonus", tipo: "receita", valor: 5000 },
      { descricao: "Venda do Carro", tipo: "receita", valor: 50000 },
    ]);
    expect(meuApp1.historicoTransacoes.totalReceitas).toBe(75000);
  });
});
