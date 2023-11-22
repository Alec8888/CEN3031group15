describe('Sign In Page', () => {
    
    it('Can sign out', () => {
        // sign in
        cy.visit('/signin')
        cy.dataCy('email-input').type('a@gmail.com');
        cy.dataCy('password-input').type('qwerasdf');
        cy.get('button[type="submit"]').click()
        cy.testRoute('/profile')

        // log out
        cy.visit('/profile')
        cy.dataCy('user-btn').click()
        cy.dataCy('logout-btn').click()
        cy.testRoute('/signin')
        // add other tests to verify logout
    })


})
