describe('template spec', () => {


 

  it('passes', () => {
    cy.visit('http://localhost:9000')
    cy.contains('Register').click()
    //cy.contains('I want to donate food').click()
    //cy.get("input[type='name']").type('John Doe')
  })
})