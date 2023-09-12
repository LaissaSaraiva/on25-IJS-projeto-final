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
  it("deve retornar uma nova conta no Aplicativo se usuário for instância de Usuário", () => {
    expect(meuApp1).toEqual({
      contasBancarias: [{ nomeBanco: "Modern Bank" }],
      historicoTransacoes: { despesas: [], receitas: [], metas: [], },
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

  it("deve adicionar uma meta Financeira e retornar uma sugestão de enconomia Mensal", () => {
    const meta1 = meuApp1.adicionaMetasFinanceiras("Viagem com a Família", 6 , 15000);
    expect(meta1).toBe("Para alcançar 15000 em 6 meses, será recomendável economizar R$2500 mensalmente.");
  });

});
