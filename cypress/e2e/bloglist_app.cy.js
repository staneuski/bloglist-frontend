describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST',`${Cypress.env('BACKEND')}/testing/reset`)

    cy.signup({ username: 'johndoe', password: 'right', name: 'John Doe' })
    cy.createBlog({
      title: 'Full Stack open',
      author: 'University of Helsinki',
      url: 'https://fullstackopen.com/en',
      likes: 2
    })
    cy.createBlog({
      title: 'BEM',
      author: 'Yandex',
      url: 'https://en.bem.info/',
      likes: 4
    })
    cy.logout()

    cy.signup({ username: 'janedoe', password: 'right', name: 'Jane Doe' })
    cy.createBlog({
      title: 'Programming Parallel Computers',
      author: 'Jukka Suomela',
      url: 'https://ppc.cs.aalto.fi/',
      likes: 6
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
    const blog = {
      title: 'a blog created by Cypress',
      author: 'docs.cypress.io',
      url: 'https://cypress.io/'
    }
    beforeEach(function() {
      cy.contains('log in').click()
      cy.get('[name="username"]').type('johndoe')
      cy.get('[name="password"]').type('right')
      cy.get('.login-form__button-login').click()
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('[name="title"]').type(blog.title)
      cy.get('[name="author"]').type(blog.author)
      cy.get('[name="url"]').type(blog.url)
      cy.get('.blog-form__button-submit').click()

      cy.get('.notification').should('contain', blog.title)
      cy.get('.notification_success')
        .should('have.css', 'color', 'rgb(0, 128, 0)')

      cy.get('.blog-list')
        .should('contain', blog.title)
        .and('contain', blog.author)
    })

    it('A blog can be liked', function() {
      cy
        .get('.blog-list')
        .contains('BEM')
        .parent().parent()
        .as('blog')

      cy.get('@blog')
        .find('.blog__button-visibility').click()

      cy.get('@blog').find('.blog__button-like').click()
      cy.get('@blog').should('contain', 'likes 5')
    })
  })
})