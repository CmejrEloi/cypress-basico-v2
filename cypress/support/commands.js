Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Cláudio')
    cy.get('#lastName').type('Manuel de Eloi Junior')
    cy.get('#email').type('claudio.eloi@ndd.com.br')
    cy.get('#phone').type('99345088')
    cy.get('#open-text-area').type('TESTE',{delay: 0})
    cy.get('button[type="submit"]').click()    
});