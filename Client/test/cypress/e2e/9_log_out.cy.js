describe('Sign In Page', () => {
    
    it('Can sign out', () => {
        // sign in
        cy.visit('/signin')
        cy.dataCy('email-input').type('a@gmail.com');
        cy.dataCy('password-input').type('qwerasdf');
        cy.get('button[type="submit"]').click()
        cy.testRoute('/home')

        // log out
        cy.visit('/home')
        cy.dataCy('user-btn').click()
        cy.dataCy('logout-btn').click()
        cy.testRoute('/signin')
        // add other tests to verify logout
    })


})
