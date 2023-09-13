const {Usuario} = require("../Classes/Usuario");
const { Transacoes } = require("../Classes/Transacoes");
const { Despesas } = require("../Classes/Despesas");
const { Receitas } = require("../Classes/Receitas");
const { ContaBancaria } = require("./ContaBancaria");
const { MetasFinanceiras } = require("./MetasFinanceiras")

class MeuAplicativo {
  usuario;
  contasBancarias = [];
  historicoTransacoes = {
    despesas: [],
    receitas: [],
    metas: [],
  };
  planejamentoMensal = { essenciais : 0,  metas : 0 }
  #saldoNoApp;

  constructor(usuario) {
    if (!(usuario instanceof Usuario)) {
      throw new Error("Insira um usuário válido");
    }
    this.usuario = usuario;
    this.#saldoNoApp = 0;
    this.adicionaPlanejamentoMensal();
  }

  get saldoNoApp() {
    return this.#saldoNoApp;
  }

  set saldoNoApp(novoSaldo) {
    return (this.#saldoNoApp = novoSaldo);
  }

  verificaValorValido(valor) {
    if (typeof valor !== "number" || valor < 0) {
      throw new Error("Insira um valor válido");
    } else {
      return true;
    }
  }

  adicionaSaldoAoApp(valor) {
    this.verificaValorValido(valor);
    this.#saldoNoApp += valor;
  }

  retiraSaldoDoApp(valor) {
    this.verificaValorValido(valor);
    this.#saldoNoApp -= valor;
  }

  mostraSaldoAtualizado() {
    return `${this.usuario.nome}, o seu saldo atualizado é: R$${this.#saldoNoApp}.`;
  }

  adicionaContaBancaria(nomeBanco, saldoConta) {
    const novaContaBancaria = new ContaBancaria(nomeBanco, saldoConta);
    this.contasBancarias.push(novaContaBancaria);
    this.adicionaSaldoAoApp(saldoConta);
  }

  adicionaDespesas(descricao, valor) {
    const novaDespesa = new Despesas(descricao, valor);
    this.historicoTransacoes.despesas.push(novaDespesa);
    this.retiraSaldoDoApp(valor);

    return "Despesa adicionada com Sucesso";
  }

  adicionaReceitas(descricao, valor) {
    const novaReceita = new Receitas(descricao, valor);
    this.historicoTransacoes.receitas.push(novaReceita);

    this.adicionaSaldoAoApp(valor);
    return "Receita adicionada com Sucesso";
  }

  adicionaMetasFinanceiras(meta, prazoEmMeses, valorTotal) {
    const novaMeta = new MetasFinanceiras(meta, prazoEmMeses, valorTotal);
    const sugestaoEconomia = novaMeta.retornaSugestaoEconomiaMensal();
    this.historicoTransacoes.metas.push(novaMeta);
    return sugestaoEconomia;
  }

  adicionaPlanejamentoMensal() {
    const salario = this.usuario.salario;
    const essenciais = 0.7;
    const metas = 0.3;

    this.planejamentoMensal.essenciais = salario * essenciais;
    this.planejamentoMensal.metas = salario * metas;

    return this.mostraPlanejamentoMensal();
  }

  mostraPlanejamentoMensal() {
    return `Olá, ${this.usuario.nome}, o seu Planejamento Financeiro ideal baseado no seu salário de R$ ${this.usuario.salario} é: gastar R$${this.planejamentoMensal.essenciais} com despesas essencias, e separar R$${this.planejamentoMensal.metas} para as metas que você deseja alcançar.`
  }
}

// const usuario3 = new Usuario("Jay", "Arquiteto", 20000, "jay@email.com", "Manny&Gloria")
// const meuApp1 = new MeuAplicativo(usuario3);

// console.log(meuApp1)
// meuApp1.adicionaPlanejamentoMensal();
// console.log(meuApp1.adicionaPlanejamentoMensal())
// console.log(meuApp1.planejamentoMensal);
// console.log(meuApp1.mostraPlanejamentoMensal())
// console.log(meuApp1.verificaValorValido(10));

// meuApp1.adicionaContaBancaria("Modern Bank", 3000)
// console.log(meuApp1.contasBancarias);

// console.log(`${meuApp1.mostraSaldoAtualizado()} - meu saldo`);
// console.log("--------------------");
// console.log(meuApp1.adicionaDespesas("Vestido Lily", 150));
// console.log(meuApp1.historicoTransacoes.despesas);
// console.log(meuApp1.adicionaReceitas("Salário", 10000));

// console.log(meuApp1.historicoTransacoes.receitas);
// console.log("--------------------");
// console.log(meuApp1.historicoTransacoes);
// console.log(`${meuApp1.saldoNoApp} - meu saldo`);

// console.log(meuApp1.adicionaMetasFinanceiras("Viagem com a Família", 6 , 15000));
// console.log(meuApp1.historicoTransacoes.metas);


module.exports = { MeuAplicativo };