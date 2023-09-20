describe('visiting landing page', () => {
    it('should be able to log in as a user and navigat to profile', () => {
        cy.visit('http://127.0.0.1:5500/login.html');
        cy.get('#username').type('testuser');
        cy.get('#password').type('password123');
        cy.get('input[type=submit]').click();

        cy.get('.profilebtn').click()

        cy.get('.edit-button').first().click()

        cy.get('.post').click()

        cy.get('#post-des').type('UPDATE TEST UPDATE ');
        cy.get('#post-img') 
        cy.get('input[type=submit]').click();
      //   cy.url().should('not.include', '/login');
        cy.get('.cancel') .click();
        // cy.visit('http://127.0.0.1:5500/index2.html');
      });
  });