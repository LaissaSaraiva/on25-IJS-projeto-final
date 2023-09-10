const { ContaBancaria } = require("../Classes/ContaBancaria");

describe("Testa Classe Conta Bancária", () => {
  let conta1;

  beforeAll(() => {
    conta1 = new ContaBancaria("Nubank", 3000);
  });
  it("deve retornar o Saldo da Conta (R$3000) com o método get saldoConta()", () => {
    expect(conta1.saldoConta).toBe(3000);
  });

  it("deve retornar 'false' ao verificar se há saldo disponível de R$4500", () => {
    expect(conta1.verificaSaldoSuficiente(4500)).toBeFalsy();
  });

  it("deve retornar o saldo R$1000 após debitar R$2000", () => {
    expect(conta1.debitaValor(2000)).toBe("Saldo atualizado: R$1000.");
  })
});
