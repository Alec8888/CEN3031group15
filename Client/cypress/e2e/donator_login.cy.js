describe('template spec', () => {

  const username = 'donator@gmail.com'
  const password = 'pantry123'

  it('Goes to sign in page', () => {
    cy.visit('http://localhost:9000')
    cy.contains('Sign In').click()
    cy.get("input[type='email']").type(username)
    cy.get("input[type='password']").type(password)
    //cy.get('button').contains('Log In').click()
  })
})