const { Usuario } = require("../Classes/Usuario");

describe("Testa a Classe Usuario", () => {
  let usuario1;

  beforeAll(() => {
    usuario1 = new Usuario(
      "Mitchel",
      "Advogado",
      5000,
      "mitchel@email.com",
      "lily&Cam"
    );
  });

  it("Verifica se o objeto usuário é instanciado corretamente", () => {
    const usuario2 = new Usuario(
      "Cameron",
      "Professor de Música",
      3000,
      "cameron@email.com",
      "lily2005"
    );

    expect(usuario2).toEqual({
      nome: "Cameron",
      profissao: "Professor de Música",
    });
  });

  it("Verifica se o valor do salário é acessado com o método get salario()", () => {
    expect(usuario1.salario).toBe(5000);
  });

  it("Verifica se a senha é alterada com o método set senha()", () => {
    usuario1.senha = "ILoveLily&Cam";
    expect(usuario1.senha).toBe("ILoveLily&Cam");
  });
});
