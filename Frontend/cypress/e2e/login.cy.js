describe('visiting registration page', () => {
    it('it passes if login.html is visited', () => {
      cy.visit('http://127.0.0.1:5500/login.html')
     })
    it('passes if divs exist', () => {
      cy.visit('http://127.0.0.1:5500/login.html')
      cy.get('div')
    })
    it('passes if a form exists', () => {
      cy.visit('http://127.0.0.1:5500/login.html')
      cy.get('form')
    })
    it('passes if there is type username in the page', () => {
      cy.visit('http://127.0.0.1:5500/login.html')
      cy.get('[type="text"]')
    })
    it('passes if there is type Password in the page', () => {
      cy.visit('http://127.0.0.1:5500/login.html')
      cy.get('[type="Password"]')
    })
    it('passes if a submit button is found', () => {
      cy.visit('http://127.0.0.1:5500/login.html')
      cy.get('[type="submit"]')
    })
    it('should be able to log in as a user', () => {
      cy.visit('http://127.0.0.1:5500/login.html');
      cy.get('#username').type('testuser');
      cy.get('#password').type('password123');
      cy.get('input[type=submit]').click();
    //   cy.url().should('not.include', '/login');
    });

});