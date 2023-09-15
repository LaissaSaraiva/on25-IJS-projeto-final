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

  it("Verifica setters e getters", () => {
    const usuario2 = new Usuario(
      "Cameron",
      "Professor de Música",
      3000,
      "cameron@email.com",
      "lily2005"
    );

    usuario2.salario = 4000;
    usuario2.email = "cameronMusica@email.com";
    usuario2.senha = "ILoveLily&Cam";
    expect(usuario2.salario).toBe(4000);
    expect(usuario2.email).toBe("cameronMusica@email.com");
    expect(usuario2.senha).toBe("ILoveLily&Cam")
  });

  it("deve retornar mensagem para senha correta", () => {
    const senhaCorreta = usuario1.validaSenha("lily&Cam");
    expect(senhaCorreta).toBe("Senha Correta, Mitchel.");   
  });

  it("deve retornar mensagem para senha incorreta'", () => {
    const senhaIncorreta = usuario1.validaSenha("AmoMinhaFamilia")
    expect(senhaIncorreta).toBe("Mitchel, sua senha está incorreta. Tente outra vez.");
  });
});
