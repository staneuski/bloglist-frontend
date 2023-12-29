describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST',`${Cypress.env('BACKEND')}/testing/reset`)

    cy.signup({ username: 'johndoe', password: 'right', name: 'John Doe' })
    cy.createBlog({
      title: 'Full Stack open',
      author: 'University of Helsinki',
      url: 'https://fullstackopen.com/en'
    })
    cy.createBlog({
      title: 'BEM',
      author: 'Yandex',
      url: 'https://en.bem.info/'
    })
    cy.logout()

    cy.signup({ username: 'janedoe', password: 'right', name: 'Jane Doe' })
    cy.createBlog({
      title: 'Programming Parallel Computers',
      author: 'Jukka Suomela',
      url: 'https://ppc.cs.aalto.fi/'
    })
    cy.logout()

    cy.visit('')
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
      cy.get('[name="username"]').type('johndoe')
      cy.get('[name="password"]').type('right')
      cy.get('.login-form__button-login').click()

      cy.contains('John Doe logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('log in').click()
      cy.get('[name="username"]').type('johndoe')
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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('log in').click()
      cy.get('[name="username"]').type('johndoe')
      cy.get('[name="password"]').type('right')
      cy.get('.login-form__button-login').click()
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('[name="title"]').type('a blog created by Cypress')
      cy.get('[name="author"]').type('docs.cypress.io')
      cy.get('[name="url"]').type('https://cypress.io/')
      cy.get('.blog-form__button-submit').click()

      cy.get('.notification')
        .should('contain', 'a blog created by Cypress')
      cy.get('.notification_success')
        .should('have.css', 'color', 'rgb(0, 128, 0)')

      cy.get('.blog-list')
        .should('contain', 'a blog created by Cypress')
        .and('contain', 'docs.cypress.io')
    })
  })
})