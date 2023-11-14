describe('template spec', () => {


 

  it('Visits Register Page', () => {
    cy.visit('http://localhost:9000')
    cy.contains('Register').click()
   
  })
})