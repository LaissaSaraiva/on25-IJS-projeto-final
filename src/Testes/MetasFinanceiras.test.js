const { MetasFinanceiras } = require("../Classes/MetasFinanceiras");


describe("Testa Classe Metas Financeiras", () => {
let meta1;
  beforeAll(() => {
    meta1 = new MetasFinanceiras("Notebook", 10, 2500);
  })

  it("deve retornar Sugestão de economial mensal para alçancar a meta no prazo escolhido", () => {
    expect(meta1.retornaSugestaoEconomiaMensal()).toBe("Para alcançar 2500 em 10 meses, será recomendável economizar R$250 mensalmente.");
  })

  it("deve guardar valor para meta e atualizar valor restante de R$2000 ", () => {
    meta1.guardaParaMeta(500);
    expect(meta1.valorRestante).toBe(2000);
  })

  it("deve retornar Status da Meta 'Em Andamento', pois ainda não foi concluída", () => {
    expect(meta1.status).toBe("Em andamento")
  })

  it("deve retornar Status da Meta 'Concluído' ", () => {
    meta1.guardaParaMeta(2000);
    expect(meta1.status).toBe("Concluído")
  })

  it("deve retornar um array de metas", () => {
    const meta2 = new MetasFinanceiras("CCXP 2024", 12, 3000);
    const arrayMetas = MetasFinanceiras.metas;
    expect(arrayMetas).toEqual([
      {
        meta: "Notebook",
        prazoEmMeses: 10,
        status: "Concluído",
        valorAtual: 2500,
        valorRestante: 0,
        valorTotal: 2500,
      },
      {
        meta: "CCXP 2024",
        prazoEmMeses: 12,
        status: "Em andamento",
        valorAtual: 0,
        valorRestante: 3000,
        valorTotal: 3000,
      },
    ]);
  })
})