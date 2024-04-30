import { faker } from '@faker-js/faker'
import CadastroPage from '../support/pages/cadastro.page';

describe('Criar Usuário', () => {
  beforeEach(() => {
    cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users')
  });
  var paginaCadastro = new CadastroPage();

  it('Usuário deve ser cadastrado com sucesso', () => {
    const nome = faker.person.fullName().replace('-');
    const email = faker.internet.email();

    cy.get('[href="/users/novo"]').click();
    paginaCadastro.typeNome(nome);
    paginaCadastro.typeEmail(email);
    paginaCadastro.clickButtonSalvar();
    cy.contains('#root', 'Usuário salvo com sucesso!');
  })

  it('Nome em branco deve dar erro', () => {
    const email = faker.internet.email();

    cy.get('[href="/users/novo"]').click();
    paginaCadastro.typeEmail(email);
    paginaCadastro.clickButtonSalvar();
    cy.contains('span.sc-cPiKLX.feFrSQ', 'O campo nome é obrigatório.');
  })

  it('Email em branco deve dar erro', () => {
    const nome = faker.person.fullName().replace('-');

    cy.get('[href="/users/novo"]').click();
    paginaCadastro.typeNome(nome);
    paginaCadastro.clickButtonSalvar();
    cy.contains('span.sc-cPiKLX.feFrSQ', 'O campo e-mail é obrigatório.');
  })

  it('Email sem "@" deve dar erro', () => {
    const nome = faker.person.fullName().replace('-');
    const email = 'teste.com';

    cy.get('[href="/users/novo"]').click();
    paginaCadastro.typeNome(nome);
    paginaCadastro.typeEmail(email);
    paginaCadastro.clickButtonSalvar();
    cy.contains('span.sc-cPiKLX.feFrSQ', 'Formato de e-mail inválido');
  })
  
  it('Email sem ".com" deve dar erro', () => {
    const nome = faker.person.fullName().replace('-');
    const email = 'teste@testetesteteste';

    cy.get('[href="/users/novo"]').click();
    paginaCadastro.typeNome(nome);
    paginaCadastro.typeEmail(email);
    paginaCadastro.clickButtonSalvar();
    cy.contains('span.sc-cPiKLX.feFrSQ', 'Formato de e-mail inválido');
  })

  it('Não é possível cadastrar email com mais de 60 caracteres', () => {
    const nome = faker.person.fullName().replace('-');
    const email = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@aaaaaaaaaaaaaaaaa';

    cy.get('[href="/users/novo"]').click();
    paginaCadastro.typeNome(nome);
    paginaCadastro.typeEmail(email);
    paginaCadastro.clickButtonSalvar();
    cy.contains('span.sc-cPiKLX.feFrSQ', 'Informe no máximo 60 caracteres para o e-mail');
  })

  it('Não é possível cadastrar email com menos de 4 caracteres', () => {
    const nome = faker.person.fullName().replace('-');
    const email = 'a@a';

    cy.get('[href="/users/novo"]').click();
    paginaCadastro.typeNome(nome);
    paginaCadastro.typeEmail(email);
    paginaCadastro.clickButtonSalvar();
    cy.contains('span.sc-cPiKLX.feFrSQ', 'Informe pelo menos 4 caracteres para o e-mail');
  })

  it('Nome numérico deve dar erro', () => {
    const nome = 123456789;
    const email = faker.internet.email();

    cy.get('[href="/users/novo"]').click();
    paginaCadastro.typeNome(nome);
    paginaCadastro.typeEmail(email);
    paginaCadastro.clickButtonSalvar();
    cy.contains('span.sc-cPiKLX.feFrSQ', 'Formato do nome é inválido.');
  })

  it('Não é possível cadastrar nome com mais de 100 caracteres', () => {
    const nome = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
    const email = faker.internet.email();

    cy.get('[href="/users/novo"]').click();
    paginaCadastro.typeNome(nome);
    paginaCadastro.typeEmail(email);
    paginaCadastro.clickButtonSalvar();
    cy.contains('span.sc-cPiKLX.feFrSQ', 'Informe no máximo 100 caracteres para o nome');
  })

  it('Não é possível cadastrar nome com menos de 4 caracteres', () => {
    const nome = 'Aaa'
    const email = faker.internet.email();

    cy.get('[href="/users/novo"]').click();
    paginaCadastro.typeNome(nome);
    paginaCadastro.typeEmail(email);
    paginaCadastro.clickButtonSalvar();
    cy.contains('span.sc-cPiKLX.feFrSQ', 'Informe pelo menos 4 letras para o nome');
  })
})
