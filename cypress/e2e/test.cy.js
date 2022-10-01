const randInt = size => Math.floor(Math.random() * size);

describe('User Testcase', () => {
  before(() => {
    cy.visit('http://localhost:8080/');
  });

  describe('User Management: UserDetail#index', () => {
    it('user page testing', () => {
      cy.get('#first_name').type('Maulik');
      cy.get('#last_name').type('Chodvadiya');
      cy.get('.btn').click();

      cy.get('#middle_name').type('Test');
      cy.get('.next-btn').click();

      cy.get('#date_of_birth').invoke('removeAttr','type').type('28/09/2022');
      cy.get('.submit-btn').click();
      cy.get('.confirm-btn').click();
    })
  });
});
