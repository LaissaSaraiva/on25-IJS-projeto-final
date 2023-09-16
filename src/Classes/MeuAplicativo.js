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
    totalDespesas: 0,
    receitas: [],
    totalReceitas: 0,
    metas: [],
  };
  planejamentoMensal = { essenciais : 0,  metas : 0 }
  #saldoNoApp;

  constructor(usuario) {
    this.validaUsuario(usuario);
    this.usuario = usuario;
    this.#saldoNoApp = 0;
    this.adicionaPlanejamentoMensal();
  }

  validaUsuario(usuario){
    if (!(usuario instanceof Usuario)) {
      return `Insira um usuário válido`
    }
  }

  get saldoNoApp() {
    return this.#saldoNoApp;
  }

  set saldoNoApp(novoSaldo) {
    this.#saldoNoApp = novoSaldo;
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
    this.somaDespesas();

    return "Despesa adicionada com Sucesso";
  }

  adicionaReceitas(descricao, valor) {
    const novaReceita = new Receitas(descricao, valor);
    this.historicoTransacoes.receitas.push(novaReceita);

    this.adicionaSaldoAoApp(valor);
    this.somaReceitas();
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

  somaDespesas() {
    const arrayValoresDespesas = this.historicoTransacoes.despesas.map(despesa => despesa.valor);

    const somaValores = arrayValoresDespesas.reduce((valor, soma) => valor + soma, 0);

    return this.historicoTransacoes.totalDespesas = somaValores;
  }

  somaReceitas() {
    const arrayValoresReceitas = this.historicoTransacoes.receitas.map(receita => receita.valor);

    const somaValores = arrayValoresReceitas.reduce((valor, soma) => valor + soma, 0);

    return this.historicoTransacoes.totalReceitas = somaValores;
  }


  mostraAlertaGastos() {
    const limiteGastos = this.planejamentoMensal.essenciais;
    const despesasTotais = this.historicoTransacoes.totalDespesas;
    const diferenca = despesasTotais - limiteGastos;

    if(despesasTotais > limiteGastos) {
      return `Alerta, você ultrapassou R$${diferenca} no seu orçamento!`;
    } else {
      return "Seus gastos estão dentro do orçamento!"
    }
  }
}

module.exports = { MeuAplicativo };