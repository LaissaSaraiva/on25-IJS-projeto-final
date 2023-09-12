class MetasFinanceiras {
  meta;
  prazoEmMeses;
  valorTotal;
  valorAtual;
  valorRestante;
  status;

  static metas = [];

  constructor(meta, prazoEmMeses, valorTotal) {
    this.verificaValorValido(valorTotal)
    this.meta = meta;
    this.valorTotal = valorTotal;
    this.prazoEmMeses = prazoEmMeses;
    this.valorAtual = 0;
    this.atualizaValorRestante();
    this.status = "Em andamento";
    this.constructor.metas.push(this);
  }
  
  verificaValorValido(valor) {
    if (typeof valor !== "number" || valor < 0) {
      throw new Error("Insira um valor válido");
    } else {
      return true;
    }
  }

  retornaSugestaoEconomiaMensal() {
    const media = this.valorTotal / this.prazoEmMeses;

    return `Para alcançar ${this.valorTotal} em ${this.prazoEmMeses} meses, será recomendável economizar R$${media} mensalmente.`
  }

  guardaParaMeta(valor) {
    this.valorAtual += valor;
    this.atualizaValorRestante();    
    this.verificaStatusMeta();
  }

  atualizaValorRestante() {
    this.valorRestante = this.valorTotal - this.valorAtual;
    return this.valorRestante;
  }

  verificaStatusMeta() {
    if(this.valorAtual === this.valorTotal){
      this.status = "Concluído"
      return `Parabéns! Meta: '${this.meta}' alcançada com sucesso!`
    } else {
      const valorRestante = this.atualizaValorRestante();
      return `Quase lá. Ainda faltam R$${valorRestante} para alcançar sua meta.`
    }
  }
}

module.exports = { MetasFinanceiras };
