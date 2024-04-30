describe('Listar Usuários', () => {
  beforeEach(() => {
    cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users');
  })

  it('Lista vazia mostra opções de cadastro de usuário', () => {
    cy.intercept('GET', 'api/v1/users', {
      statusCode: 200,
      body: []
    }).as('userList');

    cy.wait('@userList');
    cy.contains('div.sc-koXPp.csBRDe', 'Ops! Não existe nenhum usuário para ser exibido.');
    cy.contains('div.sc-koXPp.csBRDe', 'Cadastre um novo usuário');
  })

  it('Retorna lista de usuários existentes com sucesso', () => {
    cy.intercept('GET', 'api/v1/users', {
      fixture: 'listaUsuários.json'
    }).as('listaUsuários');

    cy.wait('@listaUsuários');

    cy.get('#listaUsuarios').should('be.visible');
    cy.contains('#userData', 'Nome:');
    cy.contains('#userData', 'E-mail:');
    cy.contains('#paginacaoAtual', '1 de 2');
  })
})