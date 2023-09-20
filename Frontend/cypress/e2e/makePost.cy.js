describe('visiting landing page', () => {
    it('should nvigate to login page and make a post', () => {
        cy.visit('http://127.0.0.1:5500/login.html');
        cy.get('#username').type('testuser');
        cy.get('#password').type('password123');
        cy.get('input[type=submit]').click();
      //   cy.url().should('not.include', '/login
        // cy.visit('http://127.0.0.1:5500/index.html');

        cy.get('.post').click();
        cy.get('#post-des').type('Hello guys just testing ');
        cy.get('#post-img') 
        cy.get('input[type=submit]').click();
      //   cy.url().should('not.include', '/login');
        cy.get('.cancel') .click();
      });
  });