export default class PesquisaPage {
    inputNome = 'input.sc-gsFSXq.mUpIH';
    inputEmail = 'input.sc-gsFSXq.mUpIH';
    divApagar = 'div.sc-iGgWBj.cvYpuE';

    typeNome(nome) {
        cy.get(this.inputNome).type(nome);
    }

    typeEmail(email) {
        cy.get(this.inputEmail).type(email);
    }

    clickApagar() {
        cy.get(this.divApagar).click(); 
    }
} 