it('Should logout when pressing the button', () => {
  cy.visit('/');
  cy.createUserAndAutologin();
  cy.findByTestId('profile-button').click();
  cy.findByRole('button', { name: /logout/i }).click();
  cy.window().its('localStorage').invoke('getItem', 'user').should('not.exist');
});
