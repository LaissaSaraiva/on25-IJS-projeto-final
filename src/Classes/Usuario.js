class Usuario {
  nome;
  profissao = "";
  #salario;
  #email;
  #senha;

  constructor(nome, profissao, salario, email, senha) {
    this.nome = nome;
    this.profissao = profissao;
    this.#salario = salario;
    this.#email = email;
    this.#senha = senha;
  }

  get salario() {
    return this.#salario;
  }

  set salario(novoSalario) {
    this.#salario = novoSalario;
  }

  get email() {
    return this.#email;
  }

  set email(novoEmail) {
    this.#email = novoEmail;
  }

  get senha() {
    return this.#senha;
  }

  set senha(novaSenha) {
    this.#senha = novaSenha;
  }

  validaSenha(senha) {
    if (senha !== this.#senha) {
      return `${this.nome}, sua senha está incorreta. Tente outra vez.`;
    } else {
      return `Senha Correta, ${this.nome}.`;
    }
  }
}

module.exports = { Usuario };
