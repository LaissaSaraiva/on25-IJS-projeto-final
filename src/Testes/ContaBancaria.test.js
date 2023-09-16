const { ContaBancaria } = require("../Classes/ContaBancaria");

describe("Testa Classe Conta Bancária", () => {
  let conta1;

  beforeAll(() => {
    conta1 = new ContaBancaria("Nubank", 2000);
  });
  it("deve setar e retornar o Saldo da Conta (R$3000)", () => {
    conta1.saldoConta = 3000;
    expect(conta1.saldoConta).toBe(3000);
  });

  it("deve retornar 'false' ao verificar se há saldo disponível de R$4500", () => {
    expect(conta1.verificaSaldoSuficiente(4500)).toBeFalsy();
  });

  it("deve retornar o saldo R$1000 após debitar R$2000", () => {
    expect(conta1.debitaValor(2000)).toBe("Saldo atualizado: R$1000.");
  })

  it("deve tentar debitar mais do que há na conta e receber mensagem de Operação Negada", () => {
    expect(conta1.debitaValor(3000)).toBe("Operação Negada. Saldo indisponível!")
  })

  it("deve adicionar R$1000 retornar mensagem de Saldo atualizado de R$2000", () => {
    expect(conta1.adicionaValor(1000)).toBe( "Saldo atualizado: R$2000.")
  })

  it("deve retornar uma mensagem de erro ao digitar um número inválido", () => {
    expect(() => conta1.verificaValorValido(-1)).toThrow(new Error("Insira um valor válido"));
  })
});
