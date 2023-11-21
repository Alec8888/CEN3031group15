describe('Register Page', () => {

    it('Welcome page loads and routes to register', () => {
        cy.visit('/')
        cy.testRoute('/')

        cy.dataCy('register-tab').click()
        cy.testRoute('/register')
    })

    it('Register Has the needed inputs', () => {
        cy.visit('/register')
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

    it('Can register', () => {
        cy.visit('/register')

        cy.dataCy('donate-input')
            .contains('I want to donate food.')
            .click()
        cy.dataCy('name-input').type('Test User')

        // create a unique email using the current timestamp
        cy.dataCy('email-input').type(`${Date.now()}@test.com`)
        
        cy.dataCy('orgName-input').type('Test Org')
        cy.dataCy('streetAddress-input').type('123 Test St')
        cy.dataCy('city-input').type('Test City')

        cy.dataCy('state-input').click(); // Open the dropdown
        cy.get('.q-item__label').contains('Florida').click(); // Select the option

        cy.dataCy('zip-input').type('33572')
        cy.dataCy('phone-input').type('8134449999')
        cy.dataCy('password-input').type('qwerasdf')
        cy.dataCy('confirm-password-input').type('qwerasdf')
        cy.dataCy('eula-accept').click()
        cy.dataCy('submit-register').click()
        cy.testRoute('/signin')
    })

});