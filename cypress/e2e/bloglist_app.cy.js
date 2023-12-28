describe('Note app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:5173')
  })

  it('front page is opened', function() {
    cy.contains('log in to application')
  })

  it('login form is shown', function() {
    cy.contains('log in').click()
  })
})