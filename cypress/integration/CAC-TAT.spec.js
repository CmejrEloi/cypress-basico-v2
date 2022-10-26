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
        cy.get('#phone-checkbox').check()
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

    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product')
          .select('YouTube')
          .should('have.value', 'youtube')
    })

    it('seleciona um produto (youTube) por seu value', function(){
        cy.get('#product').select('cursos').should('have.value', 'cursos')
    })

    it('seleciona um produto (YouTube) por seu indice', function(){
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    //Marcado radio button
    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]').should('have.length', 3).each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })
    
    //Marcando e desmarcando checkbox
    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]').check() //marca todos
        .should('be.checked') // verifica se ambos estão marcados
        .last().uncheck()//desmarca o ultimo
        .should('not.be.checked') // verifica se está desmarcado
    })

    //fazendo Upload de arquivos
    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]#file-upload')
          .should('not.have.value')
          .selectFile('cypress/fixtures/example.json')
          .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
          })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]#file-upload')
          .should('not.have.value')
          .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'}) //Passa o segundo argumento ACTION
          .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
          })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]#file-upload').selectFile('@sampleFile').should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
          })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it.only('acessa a página da política de privacidade removendo o target e então clicanco no link', function(){
        cy.get('#privacy a').invoke('removeAttr', 'target').click()

        cy.contains('Talking About Testing').should('be.visible')
    })

  })