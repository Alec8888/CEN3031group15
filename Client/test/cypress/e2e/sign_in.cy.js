describe('Sign In Page', () => {
    beforeEach(() => {
      cy.visit('/signin')
    })


    it('Loads the sign in page', () => {
        cy.testRoute('/signin')
    })
  
    it('Has an email input', () => {
        cy.dataCy('email-input').should('exist');
    });


    it('Can type into email input', () => {
        cy.dataCy('email-input').type('a@gmail.com');
    });

    it('Has a password input', () => {
      cy.dataCy('password-input').should('exist')
    })

    it('Can type in password input', () => {
        cy.dataCy('password-input').type('qwerasdf');
    });
    
    it('Has a submit button', () => {
      cy.get('button[type="submit"]').should('exist')
    })
  
    it('Can click the submit button', () => {
      cy.get('button[type="submit"]').click()
    })

    it('Create account link routes to register page', () => {
        cy.dataCy('link_register').click()
        cy.testRoute('/register')
  })

  it('Can sign in', () => {
    cy.dataCy('email-input').type('a@gmail.com');
    cy.dataCy('password-input').type('qwerasdf');
    cy.get('button[type="submit"]').click()
    cy.testRoute('/home')

  })

})
