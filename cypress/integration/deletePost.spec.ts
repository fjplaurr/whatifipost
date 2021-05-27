describe('Delete Post created previously', () => {
  beforeEach(() => {
    cy.createUserAndAutologin();
  });

  it('Should write a post and delete it', () => {
    cy.findAllByPlaceholderText(/what do you want to write/i).type('anything');
    cy.findByRole('button', { name: /delete/i }).click();
    cy.findByText(/anything/i).should('not.exist');
  });
});
