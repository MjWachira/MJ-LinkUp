describe('visiting landing page', () => {
    it('should be able to log in as a user and logout', () => {
        cy.visit('http://127.0.0.1:5500/login.html');
        cy.get('#username').type('testuser');
        cy.get('#password').type('password123');
        cy.get('input[type=submit]').click();

        cy.get('.profilebtn').click()

        cy.get('.delete-button').first().click()
        // cy.visit('http://127.0.0.1:5500/index2.html');
      });
  });