describe('Sign In Page', () => {
    beforeEach(() => {
      cy.visit('/signin')
    })

    it('Loads the sign in page', () => {
        cy.testRoute('/signin')
    })
  
    it('Has an email input', () => {
      cy.get('input[name="email"]').should('exist')
    })
  
    // test for can type in email input
    it('Can type in email input', () => {
        cy.dataCy('email-input').type('a@gmail.com');
    });

    it('Has a password input', () => {
      cy.get('input[name="password"]').should('exist')
    })
    
    it('Has a submit button', () => {
      cy.get('button[type="submit"]').should('exist')
    })
  
    it('Can click the submit button', () => {
      cy.get('button[type="submit"]').click()
    })

    it('Can click create account link', () => {
        cy.dataCy('link_register').click()
  })


})