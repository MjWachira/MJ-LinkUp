describe('visiting registration page', () => {
    it('it passes if register.html is visited', () => {
        cy.visit('http://127.0.0.1:5500/register.html')
      })
      it('passes if divs exist', () => {
        cy.visit('http://127.0.0.1:5500/register.html')
        cy.get('div')
      })
      it('passes if a form exists', () => {
        cy.visit('http://127.0.0.1:5500/register.html')
        cy.get('form')
      })
      it('passes if there is type text in the page', () => {
        cy.visit('http://127.0.0.1:5500/register.html')
        cy.get('[type="text"]')
      })
      it('passes if there is type Email in the page', () => {
        cy.visit('http://127.0.0.1:5500/register.html')
        cy.get('[type="email"]')
      })
      it('passes if there is type Password in the page', () => {
        cy.visit('http://127.0.0.1:5500/register.html')
        cy.get('[type="Password"]')
      })
      it('passes if a submit button is found', () => {
        cy.visit('http://127.0.0.1:5500/register.html')
        cy.get('[type="submit"]')
      })
      it('passes', () => {
        cy.visit('http://127.0.0.1:5500/register.html')
      })
      describe('Registration Form Operations', () => {
        it('should be able to register a new user', () => {
          cy.visit('/register.html'); 
          cy.get('#full-name').type(' test user');
          cy.get('#username').type('testuser');
          cy.get('#email').type('test@example.com');
          cy.get('#password').type('password123');
          cy.get('#password2').type('password123');
          
          cy.get('.login').click();
      
          cy.get('#notification'); 
        });
        it('should navigate you to login page', () => {
            cy.visit('/register.html'); 
            cy.get('.link').click();
        })
      });
  })
  