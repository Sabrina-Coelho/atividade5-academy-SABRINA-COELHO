import { faker } from '@faker-js/faker'
import CadastroPage from '../support/pages/cadastro.page';
import PesquisaPage from '../support/pages/pesquisa.page';

describe('Pesquisar Usuário', () => {
    beforeEach(() => {
        cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users')
    });
    var paginaCadastro = new CadastroPage();
    var paginaPesquisa = new PesquisaPage();

    it('Pesquisar por nome - Sucesso', () => {
        const nome = faker.person.fullName().replace('-');
        const email = faker.internet.email();

        cy.get('[href="/users/novo"]').click();
        paginaCadastro.typeNome(nome);
        paginaCadastro.typeEmail(email);
        paginaCadastro.clickButtonSalvar();
        cy.contains('#root', 'Usuário salvo com sucesso!');

        cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users');
        paginaPesquisa.typeNome(nome);
        cy.contains('#userData', 'Nome: ' + nome);
        cy.get('#userDataDetalhe').click();
        cy.get('input#userEmail.sc-dLMFU.Mcjyi').invoke('val').should('equal', email.toLocaleLowerCase());
    })

    it('Pesquisar por email - Sucesso', () => {
        const nome = faker.person.fullName().replace('-');
        const email = faker.internet.email();

        cy.get('[href="/users/novo"]').click();
        paginaCadastro.typeNome(nome);
        paginaCadastro.typeEmail(email);
        paginaCadastro.clickButtonSalvar();
        cy.contains('#root', 'Usuário salvo com sucesso!');

        cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users');
        paginaPesquisa.typeNome(email);
        cy.contains('#userData', 'Nome: ' + nome);
        cy.get('#userDataDetalhe').click();
        cy.get('input#userEmail.sc-dLMFU.Mcjyi').invoke('val').should('equal', email.toLocaleLowerCase());
    })

    it('Pesquisar por nome inválido/inexistente deve retornar erro', () => {
        paginaPesquisa.typeNome('123456789');
        cy.contains('div.sc-koXPp.csBRDe', 'Ops! Não existe nenhum usuário para ser exibido.');
        cy.contains('div.sc-koXPp.csBRDe', 'Cadastre um novo usuário');
    })

    it('Pesquisar por email inválido/inexistente deve retornar erro', () => {
        paginaPesquisa.typeNome('teste@teste.br');
        cy.contains('div.sc-koXPp.csBRDe', 'Ops! Não existe nenhum usuário para ser exibido.');
        cy.contains('div.sc-koXPp.csBRDe', 'Cadastre um novo usuário');
    })
})