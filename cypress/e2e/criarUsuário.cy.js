import { faker } from '@faker-js/faker'
import CadastroPage from '../support/pages/cadastro.page';

describe('Criar Usuário', () => {
  beforeEach(() => {
    cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users')
  });
  var paginaCadastro = new CadastroPage();

  it('Sucesso', () => {
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

  it('Email inválido deve dar erro', () => {
    const nome = faker.person.fullName().replace('-');
    const email = 'teste.com';

    cy.get('[href="/users/novo"]').click();
    paginaCadastro.typeNome(nome);
    paginaCadastro.typeEmail(email);
    paginaCadastro.clickButtonSalvar();
    cy.contains('span.sc-cPiKLX.feFrSQ', 'Formato de e-mail inválido');
  })

  it('Nome inválido deve dar erro', () => {
    const nome = 123456789;
    const email = faker.internet.email();

    cy.get('[href="/users/novo"]').click();
    paginaCadastro.typeNome(nome);
    paginaCadastro.typeEmail(email);
    paginaCadastro.clickButtonSalvar();
    cy.contains('span.sc-cPiKLX.feFrSQ', 'Formato do nome é inválido.');
  })
})
