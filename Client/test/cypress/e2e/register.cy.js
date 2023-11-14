describe('Register Page', () => {
    beforeEach(() => {
        cy.visit('/register')
    })

    it('Loads the register page', () => {
        cy.testRoute('/register')
    })

    it('Has the needed inputs', () => {
        cy.dataCy('name-input').should('exist')
        cy.dataCy('email-input').should('exist')
        cy.dataCy('orgName-input').should('exist')
        cy.dataCy('streetAddress-input').should('exist')
        cy.dataCy('city-input').should('exist')
        cy.dataCy('state-input').should('exist')
        cy.dataCy('zip-input').should('exist')
        cy.dataCy('phone-input').should('exist')
        cy.dataCy('password-input').should('exist')
        cy.dataCy('confirm-password-input').should('exist')
        cy.dataCy('eula-link').should('exist')
        cy.dataCy('eula-accept').should('exist')
        cy.dataCy('submit-register').should('exist')
        cy.dataCy('reset-btn').should('exist')

        
    })

});