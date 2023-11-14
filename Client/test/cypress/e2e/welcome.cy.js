describe('Welcome Page', () => {
    beforeEach(() => {
        cy.visit('/') // visit the root of your app
    })

    it('Loads the welcome page', () => {
        cy.get('.q-page').should('exist') // Check if the main page container exists
    })

    it('Shows the Donators heading', () => {
        cy.contains('Donators:').should('exist') // Check if the Donators heading exists
    })

    it('Shows the Food Charities heading', () => {
        cy.contains('Food Charities:').should('exist') // Check if the Food Charities heading exists
    })

    it('Shows the Register timeline entry', () => {
        cy.contains('Register').should('exist') // Check if the Register timeline entry exists
        cy.contains('Step 1').should('exist') // Check if the subtitle for the Register timeline entry exists
    })

    it('Shows the Sign In timeline entry', () => {
        cy.contains('Sign In').should('exist') // Check if the Sign In timeline entry exists
        cy.contains('Step 2').should('exist') // Check if the subtitle for the Sign In timeline entry exists
    })

    it('Shows the Add to Pantry timeline entry', () => {
        cy.contains('Add to Pantry').should('exist') // Check if the Add to Pantry timeline entry exists
        cy.contains('Step 3').should('exist') // Check if the subtitle for the Add to Pantry timeline entry exists
    })
})