describe('Donate', () => {

    it('Can submit donation', () => {

        // sign in
        cy.visit('/signin')
        cy.dataCy('email-input').type('a@gmail.com');
        cy.dataCy('password-input').type('qwerasdf');
        cy.get('button[type="submit"]').click()
        cy.testRoute('/profile')

        // submit donation
        cy.visit('/donate')
        cy.dataCy('input-food').type('Test Food')
        cy.dataCy('input-orgName').type('Test Org')
        cy.dataCy('input-dateActive').type('2023-11-14')
        cy.dataCy('input-dateExpires').type('2023-11-20')
        cy.dataCy('input-contactName').type('Test Contact')
        cy.dataCy('input-contactEmail').type('a@gmail.com')
        cy.dataCy('input-contactPhone').type('4443337777')
        cy.dataCy('input-pickupStreetAddress').type('1200 Rocky Road')
        cy.dataCy('input-pickupCity').type('Tampa')
        cy.dataCy('input-pickupState').click();
        cy.get('.q-item__label').contains('Florida').click();
        cy.dataCy('input-pickupZip').type('33572')
        cy.dataCy('submit-donation').click()

        // routed to profile on success
        cy.testRoute('/profile')
    })

});
