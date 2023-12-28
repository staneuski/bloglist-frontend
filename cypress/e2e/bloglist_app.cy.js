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

  describe('Login', function() {
    it('succeeds with correct credentials', function () {
      cy.contains('log in').click()
      cy.get('[name="username"]').type('JohnDoe')
      cy.get('[name="password"]').type('Doe')
      cy.get('.login-form__button-login').click()

      cy.contains('John Doe logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('log in').click()
      cy.get('[name="username"]').type('JohnDoe')
      cy.get('[name="password"]').type('wrong')
      cy.get('.login-form__button-login').click()

      cy.get('.notification')
        .should('contain', 'invalid username or password')
        .and('have.css', 'border-style', 'solid')
      cy.get('.notification_error')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.contains('John Doe logged in').should('not.exist')
    })
  })
})