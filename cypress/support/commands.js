Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedUser', JSON.stringify(body))
    cy.visit('')
  })
})

Cypress.Commands.add('signup', ({ username, password, name }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
    username, password, name
  }).then(() => {
    cy.login({ username, password })
  })

  cy.visit('')
})

Cypress.Commands.add('logout', () => {
  localStorage.removeItem('loggedUser')
  cy.visit('')
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    url: `${Cypress.env('BACKEND')}/blogs`,
    method: 'POST',
    body: { title, author, url },
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
    }
  })

  cy.visit('')
})