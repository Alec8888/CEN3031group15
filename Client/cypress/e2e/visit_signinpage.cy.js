describe('template spec', () => {
  it('Visits Sign In page', () => {
    cy.visit('http://localhost:9000')
    cy.contains('Sign In').click()
  })
})