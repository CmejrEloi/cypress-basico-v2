/// <reference types="Cypress" />

//Derscribe - Swite de Teste
//It - Abriga um Teste Case

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){//Valida os pre requisitos necessários antes da realização dos testes
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {        
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'NBA terá oito vencedores do prêmio em ação nesta temporada; Confira os nomes'

        cy.get('#firstName').type('Cláudio')
        cy.get('#lastName').type('Manuel de Eloi Junior')
        cy.get('#email').type('claudio.eloi@ndd.com.br')
        cy.get('#phone').type('99345088')
        cy.get('#open-text-area').type(longText,{delay: 0})
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Cláudio')
        cy.get('#lastName').type('Manuel de Eloi Junior')
        cy.get('#email').type('claudio.eloi@ndd,com.br')
        cy.get('#phone').type('99345088')
        cy.get('#open-text-area').type('Teste',{delay: 0})
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('Validar campo telefone contendo apenas numero, caso contrario continua vazio', function(){
        cy.get('#phone')
            .type('abcdefgh')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Cláudio')
        cy.get('#lastName').type('Manuel de Eloi Junior')
        cy.get('#email').type('claudio.eloi@ndd.com.br')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste',{delay: 0})
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName').type('Cláudio').should('have.value', 'Cláudio').clear().should('have.value', '')
        cy.get('#lastName').type('Manuel de Eloi Junior').should('have.value', 'Manuel de Eloi Junior').clear().should('have.value', '')
        cy.get('#email').type('claudio.eloi@ndd.com.br').should('have.value', 'claudio.eloi@ndd.com.br').clear().should('have.value', '')
        cy.get('#phone').type('99345088').should('have.value', '99345088').clear().should('have.value', '')
        cy.get('#open-text-area').type('Mensagem',{delay: 0}).should('have.value', 'Mensagem').clear().should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it.only('Acessar a página de politica e privacidade', function(){
        cy.contains('a', 'Política de Privacidade').click().should('have.text', 'Política de Privacidade')
    })
  })