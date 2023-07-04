context('Challenge', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3010/')
  })

  it('Connection and access to the app', () => {
    cy.get('#connect-btn').click()
    cy.get('#login-email').type('odessa.chesneau@gmail.com')
    cy.get('#login-password').type('Odessa0.')
    cy.get('#login-btn').click()
  })

})