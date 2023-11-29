describe('Sign In Page', () => {

    beforeEach(() => {
      cy.visit('/signin')
    })

    it('Loads the sign in page', () => {
        cy.testRoute('/signin')
    })
  
    it('Has all needed elements', () => {
        cy.dataCy('email-input').should('exist');
        cy.dataCy('password-input').should('exist');
        cy.get('button[type="submit"]').should('exist')
        cy.dataCy('link_register').should('exist')
    })

    it('Can sign in', () => {
        cy.dataCy('email-input').type('a@gmail.com');
        cy.dataCy('password-input').type('qwerasdf');
        cy.get('button[type="submit"]').click()
        cy.testRoute('/profile')
    })
})
