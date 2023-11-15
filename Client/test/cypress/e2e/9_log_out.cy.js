describe('Sign In Page', () => {
    // beforeEach(() => {
    //   cy.visit('/signin')
    // })

    // it('Can sign in', () => {
    //     cy.visit('/signin')
    //     cy.dataCy('email-input').type('a@gmail.com');
    //     cy.dataCy('password-input').type('qwerasdf');
    //     cy.get('button[type="submit"]').click()
    //     cy.testRoute('/home')
    // })

    it('Can sign out', () => {
        cy.visit('/home')
        cy.dataCy('user-btn').click()
        cy.dataCy('logout-btn').click()
        cy.testRoute('/signin')
    })


})
