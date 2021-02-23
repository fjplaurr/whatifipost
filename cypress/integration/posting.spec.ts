describe('Posting', () => {
  beforeEach(() => {
    cy.createUserAndAutologin();
  });

  it('Should write a post and appear in the screen', () => {
    cy.findAllByPlaceholderText(/what do you want to write/i).type('anything');
    cy.findByRole('button', { name: /post/i }).click();
    cy.findByText(/anything/i).should('exist');
  });
});
