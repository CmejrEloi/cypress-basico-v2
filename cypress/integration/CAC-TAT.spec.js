/// <reference types="Cypress" />

//Derscribe - Swite de Teste
//It - Abriga um Teste Case

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){//Valida os pre requisitos necessários para realização dos testes
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {        
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it.only('preenche os campos obrigatórios e envia o formulário', function(){
        cy.get('#firstName').type('Cláudio')
        cy.get('#lastName').type('Manuel de Eloi Junior')
        cy.get('#email').type('claudio.eloi@ndd.com.br')
        cy.get('#phone').type('99345088')
        cy.get('#open-text-area').type('Teste de mensagem para automatização com Cypress')
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })
  })